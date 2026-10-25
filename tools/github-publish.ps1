# Create the GitHub repository and push this plugin, using the portable
# toolchain in <workspace>\.tools (git + gh).
#
#   tools\github-publish.ps1 -RepoName dsh-deepseek-web
#
# Requires `gh auth login` once beforehand:
#   .tools\gh\bin\gh.exe auth login --hostname github.com --git-protocol https --web
param(
  [string]$RepoName = 'dsh-deepseek-web',
  [ValidateSet('public', 'private')][string]$Visibility = 'public',
  [string]$Message = 'DeepSeek web panel 1.6.0'
)

$ErrorActionPreference = 'Stop'
$plugin = Split-Path -Parent $PSScriptRoot
$workspace = Split-Path -Parent $plugin
$git = Join-Path $workspace '.tools\git\cmd\git.exe'
$gh = Join-Path $workspace '.tools\gh\bin\gh.exe'

foreach ($tool in @($git, $gh)) {
  if (-not (Test-Path $tool)) { throw "missing $tool (run the tool setup first)" }
}

$env:PATH = '{0};{1};{2}' -f (Split-Path $git), (Split-Path $gh), $env:PATH

# gh keeps its token in the OS keyring but reads hosts.yml from its config dir;
# this profile's %APPDATA% is not writable for the Host process, so use the
# workspace copy created by `auth login`.
$ghConfig = Join-Path $workspace '.tools\gh-config'
if ((Test-Path $ghConfig) -and -not $env:GH_CONFIG_DIR) { $env:GH_CONFIG_DIR = $ghConfig }

# github.com is often only reachable through the local proxy; reuse the WinINET
# setting so git and gh agree with the browser.
if (-not $env:HTTPS_PROXY) {
  $inet = Get-ItemProperty 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings' -ErrorAction SilentlyContinue
  if ($inet -and $inet.ProxyEnable -eq 1 -and $inet.ProxyServer) {
    $env:HTTPS_PROXY = "http://$($inet.ProxyServer)"
    $env:HTTP_PROXY = $env:HTTPS_PROXY
    Write-Host "using proxy $($env:HTTPS_PROXY)"
  }
}
if ($env:HTTPS_PROXY) {
  Set-Location $plugin
  & $git config http.proxy $env:HTTPS_PROXY
  & $git config https.proxy $env:HTTPS_PROXY
}

Set-Location $plugin

& $gh auth status 2>&1 | Out-Host
if ($LASTEXITCODE -ne 0) {
  throw "not signed in. Run: `"$gh`" auth login --hostname github.com --git-protocol https --web"
}

if (-not (Test-Path (Join-Path $plugin '.git'))) {
  & $git init | Out-Host
  & $git branch -M main | Out-Host
}

& $git add -A
$pending = & $git status --porcelain
if ($pending) {
  & $git -c user.name='deepseek-web-panel' -c user.email='noreply@localhost' commit -m $Message | Out-Host
} else {
  Write-Host 'nothing to commit'
}

$remotes = & $git remote
if ($remotes -contains 'origin') {
  # A plain `git push` needs a credential helper, and this profile cannot write
  # the user-wide .gitconfig, so hand git the token for this one push.
  $url = (& $git remote get-url origin).Trim()
  $token = (& $gh auth token).Trim()
  $authed = $url -replace '^https://', "https://x-access-token:$token@"
  & $git push $authed main | Out-Host
} else {
  & $gh repo create $RepoName "--$Visibility" --source . --remote origin --push | Out-Host
}

$who = (& $gh api user --jq .login).Trim()
Write-Host "done: https://github.com/$who/$RepoName"
