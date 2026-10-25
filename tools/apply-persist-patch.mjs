#!/usr/bin/env node
/**
 * Make the Desktop sidebar-browser partition persistent, so the guest's cookies
 * and localStorage survive an application restart.
 *
 * The shell creates that partition in one statement:
 *
 *     partition = `dsh-sidebar-browser-${randomUUID()}`;
 *
 * A name without the `persist:` prefix is an in-memory Electron session, so the
 * DeepSeek sign-in is thrown away with the process. The main process also
 * rejects any guest whose partition differs from the one it issued
 * (`will-attach-webview`), so no plugin can override it. This script rewrites
 * that one statement in place, with a replacement of exactly the same length so
 * no asar header, offset, or file table changes:
 *
 *     partition="persist:"+workspace.replace(/\W/g, "");
 *
 * Usage:
 *   node apply-persist-patch.mjs --check
 *   node apply-persist-patch.mjs --apply [--asar <path>]
 *   node apply-persist-patch.mjs --restore [--asar <path>]
 *
 * `--apply` refuses to run while DeepSeek Harness is open, keeps one
 * `app.asar.orig-bak` next to the archive, and reads the bytes back afterwards.
 * A DSH upgrade replaces `app.asar`, so re-run `--apply` after every upgrade.
 */

import { closeSync, copyFileSync, existsSync, openSync, readSync, statSync, writeSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';

const DEFAULT_ASAR = 'D:\\Soft\\DeepSeek Harness\\resources\\app.asar';
const OLD = 'partition = `dsh-sidebar-browser-' + '${randomUUID()}' + '`;';
const NEW = 'partition="persist:"+workspace.replace(/\\W/g, "");';
const CHUNK = 8 * 1024 * 1024;
const OVERLAP = 64;

if (OLD.length !== NEW.length) {
  console.error(`internal error: replacement length ${NEW.length} != ${OLD.length}`);
  process.exit(1);
}

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const value = (name, fallback) => {
  const index = args.indexOf(name);
  return index >= 0 && index + 1 < args.length ? args[index + 1] : fallback;
};

const asar = value('--asar', DEFAULT_ASAR);
const backup = `${asar}.orig-bak`;

/** Report whether the harness is running, so an in-place patch cannot race it. */
function harnessRunning() {
  try {
    const output = execFileSync('tasklist', ['/FI', 'IMAGENAME eq DeepSeek Harness.exe', '/NH'], {
      encoding: 'utf8',
      windowsHide: true,
    });
    return output.toLowerCase().includes('deepseek harness.exe');
  } catch (error) {
    return false;
  }
}

/** Find every byte offset of `needle` without loading the whole archive. */
function findOffsets(path, needle) {
  const size = statSync(path).size;
  const fd = openSync(path, 'r');
  const offsets = [];
  let position = 0;
  let carry = Buffer.alloc(0);
  try {
    while (position < size) {
      const buffer = Buffer.alloc(CHUNK);
      const read = readSync(fd, buffer, 0, CHUNK, position);
      if (read <= 0) break;
      const data = Buffer.concat([carry, buffer.subarray(0, read)]);
      let index = data.indexOf(needle);
      while (index >= 0) {
        offsets.push(position - carry.length + index);
        index = data.indexOf(needle, index + needle.length);
      }
      carry = data.subarray(Math.max(0, data.length - OVERLAP));
      position += read;
    }
  } finally {
    closeSync(fd);
  }
  return offsets;
}

/** Read exactly `length` bytes at one offset. */
function readAt(path, offset, length) {
  const fd = openSync(path, 'r');
  const buffer = Buffer.alloc(length);
  try {
    readSync(fd, buffer, 0, length, offset);
  } finally {
    closeSync(fd);
  }
  return buffer;
}

/** Write exactly `buffer` at one offset, leaving the file size untouched. */
function writeAt(path, offset, buffer) {
  const fd = openSync(path, 'r+');
  try {
    writeSync(fd, buffer, 0, buffer.length, offset);
  } finally {
    closeSync(fd);
  }
}

const mode = flag('--restore') ? 'restore' : flag('--apply') ? 'apply' : 'check';

if (!existsSync(asar)) {
  console.error(`no archive at ${asar}`);
  process.exit(1);
}

if (mode === 'restore') {
  if (!existsSync(backup)) {
    console.error(`no backup at ${backup}; nothing to restore`);
    process.exit(1);
  }
  copyFileSync(backup, asar);
  console.log(`restored ${asar} from ${backup}`);
  process.exit(0);
}

const oldHits = findOffsets(asar, OLD);
const newHits = findOffsets(asar, NEW);

console.log(`archive: ${asar}`);
console.log(`unpatched statement: ${oldHits.length}`);
console.log(`patched statement:   ${newHits.length}`);

if (oldHits.length === 0 && newHits.length === 1) {
  console.log('state: already persistent — nothing to do');
  process.exit(0);
}
if (oldHits.length !== 1) {
  console.error('state: unexpected — the archive does not carry exactly one known statement');
  console.error('this build differs from the one this script was written for; refusing to write');
  process.exit(2);
}

if (mode === 'check') {
  console.log('state: memory-only, patch available');
  console.log(`backup present: ${existsSync(backup)}`);
  process.exit(0);
}

if (harnessRunning() && !flag('--force')) {
  console.error('DeepSeek Harness is running; close it before patching (--apply), or pass --force');
  process.exit(3);
}

if (!existsSync(backup)) {
  copyFileSync(asar, backup);
  console.log(`backup: ${backup}`);
} else {
  console.log(`backup: ${backup} (kept)`);
}

const offset = oldHits[0];
writeAt(asar, offset, Buffer.from(NEW, 'latin1'));
const readBack = readAt(asar, offset, NEW.length).toString('latin1');
if (readBack !== NEW) {
  console.error('verification failed: read-back differs; restoring the backup');
  copyFileSync(backup, asar);
  process.exit(4);
}

console.log(`patched at byte ${offset}; read-back verified`);
console.log('next: start DeepSeek Harness, open the panel, sign in once — it will persist');
console.log(`rollback: node tools/apply-persist-patch.mjs --restore --asar "${asar}"`);
