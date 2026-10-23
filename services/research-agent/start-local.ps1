param([switch]$AllowModelCalls, [switch]$AllowCloudTraces, [switch]$AllowMemoryModelCalls, [switch]$AllowWebTools)
$ErrorActionPreference = 'Stop'
$candidates = @()
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
if ($nodeCommand) { $candidates += $nodeCommand.Source }
$candidates += Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
$selectedNode = $null
foreach ($candidate in $candidates) {
    if (Test-Path -LiteralPath $candidate) {
        $versionText = & $candidate --version
        if ($LASTEXITCODE -eq 0 -and [version]($versionText.TrimStart('v')) -ge [version]'22.22.0') { $selectedNode = $candidate; break }
    }
}
if (-not $selectedNode) { throw 'Install Node.js >=22.22.0 before starting the local agent.' }
if (-not (Test-Path -LiteralPath (Join-Path $PSScriptRoot 'node_modules\langsmith'))) {
    throw 'Install local dependencies first: npm --prefix services/research-agent ci --ignore-scripts'
}
# Ordinary startup is always offline. Explicit switches also require matching local config.
$agentArguments = @()
if ($AllowModelCalls) { $agentArguments += '--allow-model-calls' } else { $env:AGENT_MODE = 'mock' }
if ($AllowMemoryModelCalls) { $agentArguments += '--allow-memory-model-calls' } else { $env:AGENT_MEMORY_MODE = 'offline' }
if ($AllowCloudTraces) { $agentArguments += '--allow-cloud-traces' } else { $env:AGENT_TRACE_MODE = 'offline' }
if ($AllowWebTools) { $agentArguments += '--allow-web-tools' } else { $env:AGENT_TOOLS_MODE = 'mock' }
& $selectedNode (Join-Path $PSScriptRoot 'server.mjs') @agentArguments
exit $LASTEXITCODE
