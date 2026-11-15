@echo off
title Launching GEOVISTA Intelligence Platform
cd /d "%~dp0"

:: Ensure Node.js is in PATH
set "NODE_DIR=C:\Users\Rudra\AppData\Local\Programs\NodeJS\node-v20.18.0-win-x64"
if exist "%NODE_DIR%\node.exe" (
    set "PATH=%NODE_DIR%;%PATH%"
)

echo ========================================================
echo    GEOVISTA Intelligence Platform
echo    Earth Observation ^& Predictive Analytics
echo ========================================================
echo.
echo Starting development server on http://localhost:3000 ...
echo.

:: Launch browser in background after 1.5 seconds
start "" /b powershell -Command "Start-Sleep -Milliseconds 1500; Start-Process 'http://localhost:3000'"

:: Run Vite Dev Server
call npm run dev

pause
