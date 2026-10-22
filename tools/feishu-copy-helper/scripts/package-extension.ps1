$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$manifest = Get-Content -LiteralPath (Join-Path $projectRoot 'manifest.json') -Raw -Encoding UTF8 | ConvertFrom-Json
$fileNames = @('manifest.json', 'copy-platforms.js', 'copy-formats.js', 'content.js', 'background.js', 'popup.html', 'popup.js', 'README.md')
$files = $fileNames | ForEach-Object {
    $filePath = Join-Path $projectRoot $_
    if (-not (Test-Path -LiteralPath $filePath -PathType Leaf)) { throw "Missing release file: $_" }
    $filePath
}
$releaseDirectory = Join-Path $projectRoot 'dist'
New-Item -ItemType Directory -Path $releaseDirectory -Force | Out-Null
$archive = Join-Path $releaseDirectory "feishu-copy-helper-$($manifest.version).zip"
Compress-Archive -LiteralPath $files -DestinationPath $archive -Force
Get-FileHash -LiteralPath $archive -Algorithm SHA256 | Select-Object Path, Hash
