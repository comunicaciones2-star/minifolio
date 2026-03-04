param(
    [int]$Puerto = 5500
)

$ErrorActionPreference = 'Stop'

function Test-Command {
    param([string]$Name)

    return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

function Test-PortAvailable {
    param([int]$Port)

    try {
        $listenConnections = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
        if ($listenConnections) {
            return $false
        }

        $activeListeners = [System.Net.NetworkInformation.IPGlobalProperties]::GetIPGlobalProperties().GetActiveTcpListeners()
        if ($activeListeners.Port -contains $Port) {
            return $false
        }

        return $true
    }
    catch {
        return $true
    }
}

function Get-FreePort {
    param(
        [int]$PreferredPort,
        [int]$MaxAttempts = 50
    )

    for ($index = 0; $index -lt $MaxAttempts; $index++) {
        $candidatePort = $PreferredPort + $index
        if (Test-PortAvailable -Port $candidatePort) {
            return $candidatePort
        }
    }

    throw "No se encontró un puerto libre entre $PreferredPort y $($PreferredPort + $MaxAttempts - 1)."
}

$rutaProyecto = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $rutaProyecto

$puertoInicial = $Puerto
$Puerto = Get-FreePort -PreferredPort $Puerto
$url = "http://127.0.0.1:$Puerto"

Write-Host "Proyecto: $rutaProyecto"
if ($Puerto -ne $puertoInicial) {
    Write-Host "Puerto $puertoInicial ocupado. Se usará puerto libre $Puerto."
}
Write-Host "URL local: $url"

if (Test-Command "node") {
    Write-Host "Iniciando con Node (http-server)..."
    Start-Process $url
    npx --yes http-server -p $Puerto
    exit $LASTEXITCODE
}

if (Test-Command "php") {
    Write-Host "Iniciando con PHP..."
    Start-Process $url
    php -S "127.0.0.1:$Puerto"
    exit $LASTEXITCODE
}

Write-Error "No se encontró Node ni PHP en el sistema. Instala Node.js o PHP para levantar el sitio localmente."