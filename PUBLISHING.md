# Publishing this plugin to GitHub

The repository root is this folder: `deepseek-web-panel/`.

Git and the GitHub CLI are not installed on this machine, so the steps below
include installing Git once.

## 1. One-time setup

```powershell
winget install --id Git.Git -e --source winget
```

Create an empty repository on GitHub (no README, no .gitignore 鈥?this folder
already has both). Note its URL, e.g. `https://github.com/<you>/dsh-deepseek-web.git`.

## 2. First push

From this folder:

```powershell
git init
git add -A
git commit -m "DeepSeek web panel 1.6.0"
git branch -M main
git remote add origin https://github.com/<you>/dsh-deepseek-web.git
git push -u origin main
```

The helper script wraps those five commands:

```powershell
powershell -ExecutionPolicy Bypass -File publish.ps1 -Remote https://github.com/<you>/dsh-deepseek-web.git
```

## 3. Without Git: upload through the browser

1. On the empty repository, choose **uploading an existing file**.
2. Drag in every file of this folder **except** `.git`, `dist` and `node_modules`
   (`client.js`, `index.js`, `package.json`, `cordis.patch.yml`, `README.md`,
   `LICENSE`, `CHANGELOG.md`, `.gitignore`, `icon.svg`, `locale/`, `tools/`,
   `docs/`).
3. Commit.

## 4. Release

```powershell
powershell -ExecutionPolicy Bypass -File tools\pack.ps1          # writes dist\deepseek-web-panel-1.6.0.zip
gh release create v1.6.0 dist\deepseek-web-panel-1.6.0.zip --title "1.6.0" --notes-file CHANGELOG.md
```

Without `gh`: on GitHub, **Releases 鈫?Draft a new release**, tag `v1.6.0`, attach
the zip.

## What not to publish

- `.backups/` (lives outside this folder, in the workspace) 鈥?restore snapshots.
- `dist/` 鈥?build artifacts, gitignored.
- Anything from your DSH profile: no tokens, no session data, no `app.asar`
  backup. This folder contains source only.
