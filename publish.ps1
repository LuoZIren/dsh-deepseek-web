# Stage and push this plugin to GitHub.
#
#   pwsh -File publish.ps1 -Remote https://github.com/<you>/dsh-deepseek-web.git
#
# Re-runs are safe: an existing repository keeps its history and only commits
# when something changed.
param(
  [Parameter(Mandatory = $true)][string]$Remote,
  [string]$Message = 'DeepSeek web panel update'
)

$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
Set-Location $root

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  throw 'git is not installed. Install it first: winget install --id Git.Git -e --source winget'
}

if (-not (Test-Path (Join-Path $root '.git'))) {
  git init
  git branch -M main
}

git add -A
$pending = git status --porcelain
if ($pending) {
  git commit -m $Message
} else {
  Write-Host 'nothing to commit'
}

$existing = git remote
if ($existing -notcontains 'origin') {
  git remote add origin $Remote
} else {
  git remote set-url origin $Remote
}

git push -u origin main
Write-Host "pushed to $Remote"
