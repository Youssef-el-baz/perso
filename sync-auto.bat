@echo off
REM Script batch pour lancer la synchronisation automatique
powershell.exe -ExecutionPolicy Bypass -File "%~dp0sync-auto.ps1"
pause
