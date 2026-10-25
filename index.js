/**
 * Host half of the DeepSeek web panel bundle.
 *
 * The visible capability is browser-side (`client.js`), but one thing cannot
 * live there: the sidebar browser's storage partition. Desktop creates it in
 * `DesktopBrowserGuests.acquire` as `dsh-sidebar-browser-${randomUUID()}` — an
 * in-memory Electron session — and rejects any guest whose partition differs
 * from the lease it issued, so no plugin can override it. The only fix is a
 * 50-byte, equal-length rewrite of that one statement inside `app.asar`, and
 * only a Host-side process can read and write that archive.
 *
 * This half therefore exposes one same-origin route:
 *
 *   GET  /deepseek-web/patch   — the archive's patch state
 *   POST /deepseek-web/patch   — re-apply the patch (requires the marker header)
 *
 * Desktop runs the Host under Electron's node, whose `fs` resolves every path
 * that mentions `.asar` *inside* the archive. Opening the archive itself through
 * that layer fails with `ENOENT,  not found in …app.asar`, so every archive
 * access here goes through `original-fs` (unpatched `fs`) when it exists, and
 * otherwise through the normal module with Electron's asar layer disabled.
 */

import { basename, dirname, extname, join } from 'node:path';
import { createHash, randomUUID } from 'node:crypto';

/** The statement the shell builds its partition from, byte for byte. */
const OLD = 'partition = `dsh-sidebar-browser-' + '${randomUUID()}' + '`;';
/** Its equal-length replacement: a persistent partition per workspace. */
const NEW = 'partition="persist:"+workspace.replace(/\\W/g, "");';
/** Where the client reads and requests the patch. */
const ROUTE = '/deepseek-web/patch';
/** Request header a same-origin write may carry. */
const WRITE_HEADER = 'x-dsh-deepseek-web';
/**
 * Per-process write token, handed out by GET. A cross-origin page cannot read
 * the GET body (no CORS grant), so it cannot obtain the token; it also may not
 * survive as a header through the desktop protocol forwarder, which is why the
 * token travels in the query as well.
 */
const WRITE_TOKEN = randomUUID();
/** Where the client asks the Host to read one artifact's bytes. */
const FILE_ROUTE = '/deepseek-web/file';
/** Where the client polls for a pending review request. */
const REVIEW_TASK_ROUTE = '/deepseek-web/review/task';
/** Where the client posts a review answer back. */
const REVIEW_RESULT_ROUTE = '/deepseek-web/review/result';
/** Longest prompt this bridge hands to the page. */
const MAX_REVIEW_CHARS = 200000;
/** Default and maximum wait for one review answer, in milliseconds. */
const REVIEW_DEFAULT_MS = 90000;
const REVIEW_MAX_MS = 300000;
/** The one review request in flight; the page can only work on one chat. */
let reviewJob = null;
/** Whether the review tool registered, and why not when it did not. */
let reviewTool = { registered: false, error: 'not attempted yet' };
/** Request counters, so a stuck review can be told apart from an idle one. */
const reviewStats = { polls: 0, posts: 0, lastTaskId: '', lastResult: null };
/** Waiters keyed by request id, so a late answer resolves its own call. */
const reviewWaiters = new Map();
/** Answers already produced, keyed by prompt and previous findings. */
const reviewCache = new Map();
/** How many answers the dedupe cache keeps before the oldest is dropped. */
const REVIEW_CACHE_LIMIT = 32;

/**
 * Queue one review request and wait for the page's answer.
 * @param prompt - the text to send into the page.
 * @param waitMs - how long to wait before giving up.
 * @param previous - findings from the last round, confirmed one by one.
 * @returns the answer text.
 */
export function requestReview(prompt, waitMs, previous = []) {
  if (reviewJob !== null) return Promise.reject(new Error('another review is already running'));
  const id = randomUUID();
  // The client budgets its own page-side wait from the same value, so it gives
  // up slightly before this call does and its error text reaches the model.
  reviewJob = {
    id,
    prompt,
    previous,
    createdAt: Date.now(),
    timeoutMs: Math.max(20000, waitMs - 5000),
  };
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reviewWaiters.delete(id);
      if (reviewJob !== null && reviewJob.id === id) reviewJob = null;
      reject(new Error('the DeepSeek panel did not answer in time'));
    }, waitMs);
    reviewWaiters.set(id, { resolve, reject, timer });
  });
}

/**
 * Settle one review request with the page's answer.
 * @param id - the request the answer belongs to.
 * @param ok - whether the page produced an answer.
 * @param text - the answer text.
 * @param error - why it failed, when it did.
 * @returns whether a waiter was waiting for it.
 */
export function settleReview(id, ok, text, error) {
  if (reviewJob !== null && reviewJob.id === id) reviewJob = null;
  const waiter = reviewWaiters.get(id);
  if (waiter === undefined) return false;
  reviewWaiters.delete(id);
  clearTimeout(waiter.timer);
  if (ok === true && typeof text === 'string' && text.trim().length > 0) waiter.resolve(text);
  else waiter.reject(new Error(typeof error === 'string' && error.length > 0 ? error : 'the panel returned no answer'));
  return true;
}

/** Largest artifact this route will hand back, as base64 over one request. */
const MAX_FILE_BYTES = 24 * 1024 * 1024;
/** Extension-to-type table for the artifacts a turn usually produces. */
const MIME_TYPES = {
  '.md': 'text/markdown',
  '.markdown': 'text/markdown',
  '.txt': 'text/plain',
  '.csv': 'text/csv',
  '.json': 'application/json',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.ts': 'text/plain',
  '.tsx': 'text/plain',
  '.jsx': 'text/plain',
  '.py': 'text/x-python',
  '.html': 'text/html',
  '.css': 'text/css',
  '.xml': 'text/xml',
  '.yaml': 'text/yaml',
  '.yml': 'text/yaml',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.zip': 'application/zip',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
};
/** Scan window; the archive is read in these slices. */
const CHUNK = 8 * 1024 * 1024;
/** Bytes kept between slices so a match across the boundary is still seen. */
const OVERLAP = 64;

if (OLD.length !== NEW.length) {
  throw new Error(`deepseek-web: replacement length ${NEW.length} differs from ${OLD.length}`);
}

/** The last answered state, so a poll does not re-read the whole archive. */
let cached = null;
/** Resolved once: the promise API that is not routed through the asar layer. */
let rawFsPromise = null;

/**
 * Resolve a filesystem whose paths are never rewritten into the archive.
 * @returns the promise API of `original-fs`, or of the node module otherwise.
 */
function rawFs() {
  if (rawFsPromise === null) {
    rawFsPromise = (async () => {
      try {
        const mod = await import('original-fs');
        const api = mod.promises ?? mod.default?.promises;
        if (api !== undefined) return api;
      } catch (error) {
        // Not running under Electron; the plain module is already raw.
      }
      return import('node:fs/promises');
    })();
  }
  return rawFsPromise;
}

/**
 * Run one filesystem call with Electron's asar layer switched off.
 *
 * The patched functions read `process.noAsar` when they are invoked, so the flag
 * only has to cover the synchronous call that starts the operation, not the
 * await that follows.
 * @param operation - the call to start.
 * @returns whatever the call returned.
 */
function rawCall(operation) {
  const previous = process.noAsar;
  process.noAsar = true;
  try {
    return operation();
  } finally {
    process.noAsar = previous;
  }
}

/** Count non-overlapping occurrences of one ASCII needle in a buffer. */
function countOf(buffer, needle) {
  let count = 0;
  let index = buffer.indexOf(needle);
  while (index >= 0) {
    count += 1;
    index = buffer.indexOf(needle, index + needle.length);
  }
  return count;
}

/** Whether a path exists, through the raw filesystem. */
async function pathExists(path) {
  const fs = await rawFs();
  try {
    await rawCall(() => fs.access(path));
    return true;
  } catch (error) {
    return false;
  }
}

/** Resolve the desktop archive from an explicit override, then the host binary. */
async function resolveAsar() {
  const candidates = [];
  const explicit = process.env.DSH_DESKTOP_ASAR;
  if (typeof explicit === 'string' && explicit.length > 0) candidates.push(explicit);
  const exec = typeof process.execPath === 'string' ? process.execPath : '';
  if (exec.length > 0) {
    const root = dirname(exec);
    candidates.push(join(root, 'resources', 'app.asar'));
    candidates.push(join(root, '..', 'resources', 'app.asar'));
    candidates.push(join(root, '..', '..', 'resources', 'app.asar'));
  }
  for (const candidate of candidates) {
    if (await pathExists(candidate)) return candidate;
  }
  return null;
}

/** Count both statements in one pass over the archive. */
async function scanArchive(path) {
  const fs = await rawFs();
  const handle = await rawCall(() => fs.open(path, 'r'));
  try {
    const info = await handle.stat();
    const counts = { old: 0, new: 0 };
    let position = 0;
    let carry = Buffer.alloc(0);
    while (position < info.size) {
      const buffer = Buffer.alloc(CHUNK);
      const read = await handle.read(buffer, 0, CHUNK, position);
      if (read.bytesRead <= 0) break;
      const data = Buffer.concat([carry, buffer.subarray(0, read.bytesRead)]);
      counts.old += countOf(data, OLD);
      counts.new += countOf(data, NEW);
      carry = data.subarray(Math.max(0, data.length - OVERLAP));
      position += read.bytesRead;
    }
    return counts;
  } finally {
    await handle.close();
  }
}

/** Byte offset of the single unpatched statement, or -1. */
async function findStatement(path) {
  const fs = await rawFs();
  const handle = await rawCall(() => fs.open(path, 'r'));
  try {
    const info = await handle.stat();
    let position = 0;
    let carry = Buffer.alloc(0);
    while (position < info.size) {
      const buffer = Buffer.alloc(CHUNK);
      const read = await handle.read(buffer, 0, CHUNK, position);
      if (read.bytesRead <= 0) break;
      const data = Buffer.concat([carry, buffer.subarray(0, read.bytesRead)]);
      const index = data.indexOf(OLD);
      if (index >= 0) return position - carry.length + index;
      carry = data.subarray(Math.max(0, data.length - OVERLAP));
      position += read.bytesRead;
    }
    return -1;
  } finally {
    await handle.close();
  }
}

/** Read back `length` bytes at one offset. */
async function readAt(path, offset, length) {
  const fs = await rawFs();
  const handle = await rawCall(() => fs.open(path, 'r'));
  try {
    const buffer = Buffer.alloc(length);
    await handle.read(buffer, 0, length, offset);
    return buffer.toString('latin1');
  } finally {
    await handle.close();
  }
}

/**
 * Answer the archive's patch state, scanning only when the cache is cold.
 * @param force - ignore the cached answer.
 * @returns the state the status dot renders.
 */
export async function readState(force = false) {
  if (cached !== null && force === false) return cached;
  const asar = await resolveAsar();
  if (asar === null) {
    cached = {
      state: 'unknown',
      asar: null,
      backup: false,
      execPath: process.execPath,
      error: 'resources/app.asar was not found',
    };
    return cached;
  }
  const counts = await scanArchive(asar);
  const backup = await pathExists(`${asar}.orig-bak`);
  if (counts.old === 1 && counts.new === 0) {
    cached = { state: 'missing', asar, backup, old: counts.old, new: counts.new };
  } else if (counts.old === 0 && counts.new === 1) {
    cached = { state: 'patched', asar, backup, old: counts.old, new: counts.new };
  } else {
    cached = {
      state: 'unsupported',
      asar,
      backup,
      old: counts.old,
      new: counts.new,
      error: 'the archive does not carry exactly one known partition statement',
    };
  }
  return cached;
}

/**
 * Rewrite the partition statement in place, keeping every offset intact.
 * @returns the outcome plus the resulting state.
 */
export async function applyPatch() {
  const before = await readState(true);
  if (before.state === 'patched') return { ok: true, applied: false, state: before };
  if (before.state !== 'missing') {
    return { ok: false, applied: false, error: before.error ?? before.state, state: before };
  }
  const fs = await rawFs();
  const backup = `${before.asar}.orig-bak`;
  if (!(await pathExists(backup))) {
    await rawCall(() => fs.copyFile(before.asar, backup));
  }
  const offset = await findStatement(before.asar);
  if (offset < 0) {
    const state = await readState(true);
    return { ok: false, applied: false, error: 'the statement vanished between scan and write', state };
  }
  const handle = await rawCall(() => fs.open(before.asar, 'r+'));
  try {
    await handle.write(Buffer.from(NEW, 'latin1'), 0, NEW.length, offset);
  } finally {
    await handle.close();
  }
  const readBack = await readAt(before.asar, offset, NEW.length);
  if (readBack !== NEW) {
    await rawCall(() => fs.copyFile(backup, before.asar));
    const state = await readState(true);
    return { ok: false, applied: false, error: 'read-back mismatch; the backup was restored', state };
  }
  const state = await readState(true);
  return { ok: state.state === 'patched', applied: true, state };
}

/**
 * Read one artifact the client wants to hand to the web chat.
 * @param path - absolute host path reported by the conversation card.
 * @returns the file name, its type, and its bytes as base64.
 */
export async function readFilePayload(path) {
  if (typeof path !== 'string' || path.length === 0) throw new Error('no path was given');
  const fs = await rawFs();
  const info = await rawCall(() => fs.stat(path));
  if (info.isDirectory()) throw new Error('that path is a directory');
  if (info.size > MAX_FILE_BYTES) {
    throw new Error(`the file is larger than ${Math.round(MAX_FILE_BYTES / 1024 / 1024)} MB`);
  }
  const bytes = await rawCall(() => fs.readFile(path));
  const type = MIME_TYPES[extname(path).toLowerCase()] ?? 'application/octet-stream';
  return { name: basename(path), type, size: info.size, base64: bytes.toString('base64') };
}

/** Directories a basename search never descends into. */
const SKIP_DIRS = new Set([
  'node_modules', 'dist', 'build', 'out', 'coverage', '.git', '.next', '.cache', '.turbo', 'target',
]);

/**
 * Find files by basename under a workspace root, bounded in depth and breadth.
 * @param root - absolute directory to search.
 * @param name - exact basename, matched case-insensitively.
 * @returns absolute paths of the matches.
 */
export async function findByName(root, name) {
  const fs = await rawFs();
  const wanted = String(name).toLowerCase();
  const matches = [];
  const walk = async (dir, depth) => {
    if (depth > 5 || matches.length > 8) return;
    let entries;
    try {
      entries = await rawCall(() => fs.readdir(dir, { withFileTypes: true }));
    } catch (error) {
      return;
    }
    for (const entry of entries) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (depth < 5 && SKIP_DIRS.has(entry.name) === false && entry.name.startsWith('.') === false) {
          await walk(full, depth + 1);
        }
      } else if (entry.name.toLowerCase() === wanted) {
        matches.push(full);
        if (matches.length > 8) return;
      }
    }
  };
  await walk(root, 0);
  return matches;
}

/**
 * Resolve one artifact by basename within a workspace root.
 * @param root - absolute workspace directory.
 * @param name - exact file name the UI shows.
 * @returns the payload plus the matched path.
 */
export async function readFileByName(root, name) {
  if (typeof root !== 'string' || root.length === 0) throw new Error('no workspace root was given');
  if (typeof name !== 'string' || name.length === 0) throw new Error('no file name was given');
  const matches = await findByName(root, name);
  if (matches.length === 0) throw new Error(`no file named ${name} under the workspace`);
  if (matches.length > 1) {
    throw new Error(`${matches.length} files are named ${name}; drag the exact card instead`);
  }
  const payload = await readFilePayload(matches[0]);
  return { ...payload, path: matches[0] };
}

/** Write one JSON response with no caching and no CORS grant. */
function sendJson(res, code, body) {
  const payload = JSON.stringify(body);
  res.writeHead(code, {
    'content-type': 'application/json; charset=utf-8',
    'content-length': Buffer.byteLength(payload),
    'cache-control': 'no-store',
  });
  res.end(payload);
}

/** Read one bounded JSON request body. */
async function readJsonBody(req, limit = 4 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > limit) {
        reject(new Error('request body is too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      try {
        const text = Buffer.concat(chunks).toString('utf8');
        resolve(text.length === 0 ? {} : JSON.parse(text));
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

/**
 * Convert a parameter spec — the `{ name: { type, required, description } }`
 * form the shipped tools author — into the JSON Schema the registry validates.
 * This mirrors `defineTool`, which cannot be imported from a profile bundle.
 * @param spec - the parameter spec.
 * @returns the JSON Schema form.
 */
export function toParameterSchema(spec) {
  const properties = {};
  const required = [];
  for (const [name, value] of Object.entries(spec)) {
    const { required: isRequired, ...rest } = value;
    properties[name] = rest;
    if (isRequired === true) required.push(name);
  }
  const schema = { type: 'object', properties };
  if (required.length > 0) schema.required = required;
  return schema;
}

/**
 * Convert a value spec into the JSON Schema the registry validates.
 * @param spec - `{ type, additionalProperties?, properties }` with inline `required`.
 * @returns the JSON Schema form.
 */
export function toValueSchema(spec) {
  const properties = {};
  const required = [];
  for (const [name, value] of Object.entries(spec.properties ?? {})) {
    const { required: isRequired, ...rest } = value;
    properties[name] = rest;
    if (isRequired === true) required.push(name);
  }
  const schema = { ...spec, properties };
  if (required.length > 0) schema.required = required;
  else delete schema.required;
  return schema;
}

/**
 * The first complete JSON value in a text, or null.
 * @param text - the answer the page produced.
 * @returns the parsed value.
 */
function firstJsonValue(text) {
  const open = text.search(/[[{]/);
  if (open < 0) return null;
  const opener = text[open];
  const closer = opener === '{' ? '}' : ']';
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = open; i < text.length; i += 1) {
    const ch = text[i];
    if (inString === true) {
      if (escaped === true) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') inString = true;
    else if (ch === opener) depth += 1;
    else if (ch === closer) {
      depth -= 1;
      if (depth === 0) {
        try {
          return JSON.parse(text.slice(open, i + 1));
        } catch (error) {
          return null;
        }
      }
    }
  }
  return null;
}

/**
 * Normalize one finding the model wrote, tolerating its own key names.
 * @param item - one entry of the `findings` array.
 * @returns the finding, or null when it names no problem.
 */
function normalizeFinding(item) {
  if (item === null || typeof item !== 'object') return null;
  const problem = String(item.problem ?? item.issue ?? item['\u95ee\u9898'] ?? '').trim();
  if (problem.length === 0) return null;
  const rawSeverity = String(item.severity ?? item['\u4e25\u91cd\u7ea7\u522b'] ?? item.level ?? '').toLowerCase();
  const severity = /high|critical|\u9ad8/.test(rawSeverity) ? 'high'
    : /low|minor|\u4f4e/.test(rawSeverity) ? 'low'
      : 'medium';
  const finding = { severity, problem: problem.slice(0, 500) };
  const reason = String(item.reason ?? item['\u539f\u56e0'] ?? item.why ?? '').trim();
  const fix = String(item.fix ?? item.suggestion ?? item['\u6539\u6cd5'] ?? '').trim();
  const evidence = String(item.evidence ?? item['\u8bc1\u636e'] ?? '').trim();
  const confidence = Number(item.confidence);
  if (reason.length > 0) finding.reason = reason.slice(0, 800);
  if (fix.length > 0) finding.fix = fix.slice(0, 800);
  if (evidence.length > 0) finding.evidence = evidence.slice(0, 500);
  if (Number.isFinite(confidence) === true && confidence >= 0 && confidence <= 1) {
    finding.confidence = confidence;
  }
  return finding;
}

/**
 * Read the structured findings out of an answer, when it has any.
 * @param text - the answer the page produced.
 * @returns the findings, or null when the answer is prose.
 */
export function parseFindings(text) {  const raw = String(text ?? '');
  const fenced = /```(?:json)?\s*([\s\S]*?)```/i.exec(raw);
  const source = fenced === null ? raw : fenced[1];
  const value = firstJsonValue(source);
  if (value === null) return null;
  const list = Array.isArray(value) ? value : Array.isArray(value.findings) ? value.findings : null;
  if (list === null) return null;
  const findings = [];
  for (const item of list.slice(0, 20)) {
    const finding = normalizeFinding(item);
    if (finding !== null) findings.push(finding);
  }
  return findings;
}

/**
 * The identity of one review request, for the dedupe cache.
 * @param prompt - the request text.
 * @param previous - findings from the last round.
 * @returns a stable key.
 */
function reviewKey(prompt, previous) {
  return createHash('sha256').update(prompt).update('\u0000').update(previous.join('\u0000')).digest('hex');
}

/** Observation hook for tests and diagnostics: the queue's current shape. */
export function reviewState() {
  return {
    job: reviewJob === null ? null : { id: reviewJob.id, createdAt: reviewJob.createdAt },
    waiters: reviewWaiters.size,
  };
}

/** The only service this half needs: the HTTP carrier. */
export const inject = ['webServer'];

/**
 * Register the two routes this bundle serves: the partition patch and the
 * artifact reader the drop bridge uses.
 * @param ctx - the host plugin context, carrying `webServer`.
 */
export function apply(ctx) {
  ctx.effect(() => ctx.webServer.register({
    kind: 'exact',
    path: ROUTE,
    async handler(req, res) {
      try {
        if (req.method === 'GET') {
          const url = typeof req.url === 'string' ? req.url : '';
          sendJson(res, 200, {
            ok: true,
            token: WRITE_TOKEN,
            state: await readState(url.includes('refresh=1')),
            review: { ...reviewTool, ...reviewStats },
          });
          return;
        }
        if (req.method === 'POST') {
          const url = typeof req.url === 'string' ? req.url : '';
          const marked = req.headers[WRITE_HEADER] === 'patch'
            || url.includes(`token=${WRITE_TOKEN}`);
          if (!marked) {
            sendJson(res, 403, { ok: false, error: 'missing request marker' });
            return;
          }
          sendJson(res, 200, await applyPatch());
          return;
        }
        sendJson(res, 405, { ok: false, error: 'method not allowed' });
      } catch (error) {
        sendJson(res, 500, { ok: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  }), 'deepseek-web: patch route');
  ctx.effect(() => ctx.webServer.register({
    kind: 'exact',
    path: FILE_ROUTE,
    async handler(req, res) {
      try {
        if (req.method !== 'GET') {
          sendJson(res, 405, { ok: false, error: 'method not allowed' });
          return;
        }
        const url = new URL(typeof req.url === 'string' ? req.url : '/', 'http://localhost');
        if (url.searchParams.get('token') !== WRITE_TOKEN) {
          sendJson(res, 403, { ok: false, error: 'missing request marker' });
          return;
        }
        const name = url.searchParams.get('name');
        if (typeof name === 'string' && name.length > 0) {
          sendJson(res, 200, {
            ok: true,
            file: await readFileByName(url.searchParams.get('root'), name),
          });
          return;
        }
        sendJson(res, 200, { ok: true, file: await readFilePayload(url.searchParams.get('path')) });
      } catch (error) {
        sendJson(res, 500, { ok: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  }), 'deepseek-web: artifact route');
  ctx.effect(() => ctx.webServer.register({
    kind: 'exact',
    path: REVIEW_TASK_ROUTE,
    async handler(req, res) {
      try {
        if (req.method !== 'GET') {
          sendJson(res, 405, { ok: false, error: 'method not allowed' });
          return;
        }
        reviewStats.polls += 1;
        if (reviewJob !== null) reviewStats.lastTaskId = reviewJob.id;
        sendJson(res, 200, { ok: true, task: reviewJob });
      } catch (error) {
        sendJson(res, 500, { ok: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  }), 'deepseek-web: review task route');
  ctx.effect(() => ctx.webServer.register({
    kind: 'exact',
    path: REVIEW_RESULT_ROUTE,
    async handler(req, res) {
      try {
        if (req.method !== 'POST') {
          sendJson(res, 405, { ok: false, error: 'method not allowed' });
          return;
        }
        reviewStats.posts += 1;
        // The desktop protocol forwarder may drop a request body, so the same
        // answer is also accepted from the query, which the client retries with.
        const body = await readJsonBody(req).catch(() => ({}));
        const url = new URL(typeof req.url === 'string' ? req.url : '/', 'http://localhost');
        const id = String(body?.id ?? url.searchParams.get('id') ?? '');
        const okRaw = body?.ok ?? url.searchParams.get('ok');
        const text = typeof body?.text === 'string' ? body.text : String(url.searchParams.get('text') ?? '');
        const error = typeof body?.error === 'string' ? body.error : String(url.searchParams.get('error') ?? '');
        reviewStats.lastResult = { id, ok: okRaw === true || okRaw === 'true', error: error.slice(0, 200) };
        const accepted = settleReview(id, okRaw === true || okRaw === 'true', text, error);
        sendJson(res, accepted ? 200 : 410, { ok: accepted });
      } catch (error) {
        sendJson(res, 500, { ok: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  }), 'deepseek-web: review result route');
  ctx.effect(() => {
    const tools = ctx.get('tools');
    if (tools === undefined) {
      reviewTool = { registered: false, error: 'the tools service is absent' };
      console.warn('[deepseek-web] the tools service is absent; web_review stays unregistered');
      return () => {};
    }
    // A rejected definition must not take the other routes down with it.
    try {
      const dispose = tools.register({
        name: 'web_review',
        description: 'Send a code-review request to the DeepSeek web chat open in the sidebar and return its answer. '
          + 'The prompt travels to DeepSeek and is visible in that chat, so it needs the panel open and signed in.',
        // The registry validates JSON Schema; these helpers convert the spec form
        // the shipped tools author into it (`defineTool` cannot be imported here).
        parameters: toParameterSchema({
          prompt: {
            type: 'string',
            required: true,
            description: 'The review request: the code or diff to review, plus the answer format you want.',
          },
          previousFindings: {
            type: 'array',
            items: { type: 'string' },
            description: 'Findings from the last round; the answer confirms each one before adding new ones.',
          },
          timeoutSeconds: {
            type: 'number',
            description: 'How long to wait for the answer: default 90, at most 300.',
          },
          force: {
            type: 'boolean',
            description: 'Repeat a prompt that was already reviewed instead of returning the cached answer.',
          },
        }),
        output: {
          schema: toValueSchema({
            type: 'object',
            additionalProperties: false,
            properties: {
              report: { type: 'string', required: true },
              findings: {
                type: 'array',
                required: true,
                items: {
                  type: 'object',
                  additionalProperties: false,
                  properties: {
                    severity: { type: 'string' },
                    problem: { type: 'string' },
                    reason: { type: 'string' },
                    fix: { type: 'string' },
                    evidence: { type: 'string' },
                    confidence: { type: 'number' },
                  },
                  required: ['severity', 'problem'],
                },
              },
              parsed: { type: 'boolean', required: true },
              cached: { type: 'boolean', required: true },
              elapsedMs: { type: 'integer', required: true },
            },
          }),
          render: (_args, value) => {
            if (value.parsed !== true || value.findings.length === 0) {
              return [{ type: 'text', text: value.report }];
            }
            const lines = value.findings.map((finding) => {
              const head = `[${finding.severity}] ${finding.problem}`;
              const reason = finding.reason === undefined ? '' : ` — ${finding.reason}`;
              const fix = finding.fix === undefined ? '' : ` → ${finding.fix}`;
              return head + reason + fix;
            });
            return [{ type: 'text', text: (value.cached === true ? '(cached)\n' : '') + lines.join('\n') }];
          },
        },
        timeoutMs: REVIEW_MAX_MS + 15000,
        isConcurrencySafe: () => false,
        async execute(args) {
          const prompt = String(args?.prompt ?? '').trim();
          if (prompt.length === 0) throw new Error('prompt must not be empty');
          if (prompt.length > MAX_REVIEW_CHARS) {
            throw new Error(`the prompt is longer than ${MAX_REVIEW_CHARS} characters; send a smaller diff`);
          }
          const previous = Array.isArray(args?.previousFindings)
            ? args.previousFindings.map((item) => String(item).slice(0, 500)).slice(0, 20)
            : [];
          const seconds = Number(args?.timeoutSeconds);
          const waitMs = Number.isFinite(seconds) && seconds >= 20
            ? Math.min(REVIEW_MAX_MS, Math.round(seconds) * 1000)
            : REVIEW_DEFAULT_MS;
          const key = reviewKey(prompt, previous);
          if (args?.force !== true) {
            const cached = reviewCache.get(key);
            if (cached !== undefined) {
              return { ...cached, cached: true, elapsedMs: 0 };
            }
          }
          const started = Date.now();
          const report = await requestReview(prompt, waitMs, previous);
          const findings = parseFindings(report);
          const result = {
            report,
            findings: findings ?? [],
            parsed: findings !== null,
            cached: false,
            elapsedMs: Date.now() - started,
          };
          reviewCache.set(key, { report, findings: result.findings, parsed: result.parsed });
          if (reviewCache.size > REVIEW_CACHE_LIMIT) {
            const oldest = reviewCache.keys().next();
            if (oldest.done !== true) reviewCache.delete(oldest.value);
          }
          return result;
        },
      });
      reviewTool = { registered: true, error: '' };
      return dispose;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      reviewTool = { registered: false, error: message };
      console.warn('[deepseek-web] web_review was not registered:', error);
      return () => {};
    }
  }, 'deepseek-web: review tool');
}
