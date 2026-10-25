# Changelog

## 1.6.0 — 2025-10-25

Review bridge, settings page, and hardening found by reviewing this plugin with
its own tool.

### Added

- `web_review` tool: sends a review prompt into the DeepSeek page already open in
  the Sidebar and returns the answer. Single flight, 90 s default wait (300 s
  max), 200 000 character prompt cap.
- Structured answers: the default format asks for one JSON block and the tool
  returns `findings[]` (`severity`, `problem`, `reason`, `fix`), plus the raw
  `report`; `parsed: false` marks a prose answer.
- Dedupe: the same prompt with the same previous findings returns the cached
  answer; `force: true` re-asks.
- Re-review: `previousFindings: string[]` asks the page to confirm each earlier
  finding (fixed / still there / changed) before adding new ones.
- Conversation card for every `web_review` call: one row per finding with a
  checkbox, state kept per call in local storage.
- Settings page (**Settings → DeepSeek web chat**): status dot size, halo,
  breathing, colours, drop auto-open, file size cap, review output format
  (list / JSON / strict JSON), review checklist, findings cap.
- Drag bridge: drag a file, a file card, a card header (all files it lists), an
  inline link, or a reference that only shows a name. Nothing is sent until the
  drag is released on the drop bar.

### Changed

- DeepSeek answers are read from the page's own answer marker
  (`ds-assistant-message-main-content`), so the "deep thinking" reasoning block
  no longer ends up in the draft.
- Typing into the composer goes through `execCommand('insertText')` first, then
  the native value setter, so a controlled React field keeps the text.
- The send control is found inside the composer's own container; an icon-only
  `DIV.ds-button` is recognised, and a wrong guess never clicks a random button.
- Relative references containing `..` are refused; relative paths are joined
  with the platform separator.
- Locale changes now reach an open settings page and already-rendered cards.

### Fixed

- Every `executeJavaScript` call has a deadline, and every review request a fetch
  timeout, so a stalled page reports instead of hanging the call.
- A failed review no longer leaves an extra browser tab behind, and a tab that
  navigated away is not reused.
- Task polling no longer depends on another component having fetched the write
  token first.
