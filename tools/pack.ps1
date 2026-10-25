# Build a release zip of this plugin (source only, no .git and no dist).
#
#   pwsh -File tools\pack.ps1
#
# Writes dist\deepseek-web-panel-<version>.zip next to the plugin folder.
$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$manifest = Get-Content (Join-Path $root 'package.json') -Raw | ConvertFrom-Json
$dist = Join-Path $root 'dist'
$zip = Join-Path $dist ("deepseek-web-panel-{0}.zip" -f $manifest.version)

New-Item -ItemType Directory -Path $dist -Force | Out-Null
if (Test-Path $zip) { Remove-Item $zip -Force }

$staging = Join-Path $env:TEMP ("dsw-pack-{0}" -f [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $staging -Force | Out-Null

$skip = @('.git', 'dist', 'node_modules')
Get-ChildItem $root -Force | Where-Object { $skip -notcontains $_.Name } | ForEach-Object {
  Copy-Item $_.FullName -Destination $staging -Recurse -Force
}

Compress-Archive -Path (Join-Path $staging '*') -DestinationPath $zip -CompressionLevel Optimal
Remove-Item $staging -Recurse -Force
Write-Host "wrote $zip"
