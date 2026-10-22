@echo off
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0services\research-agent\start-local.ps1"
if errorlevel 1 pause
