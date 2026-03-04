@echo off
setlocal

set "PROJECT_DIR=%~dp0"
set "PORT=%~1"

if "%PORT%"=="" (
    powershell -NoProfile -ExecutionPolicy Bypass -File "%PROJECT_DIR%inicio-rapido.ps1"
) else (
    powershell -NoProfile -ExecutionPolicy Bypass -File "%PROJECT_DIR%inicio-rapido.ps1" -Puerto %PORT%
)

endlocal