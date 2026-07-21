@echo off
setlocal
cd /d "%~dp0"
if not exist ".env" copy /y ".env.example" ".env" >nul
docker compose up -d --wait
if errorlevel 1 exit /b 1
echo [SunWise] Iniciando API en http://localhost:3000/api
echo [SunWise] Mantenga esta ventana abierta. Use Ctrl+C para detenerla.
call npm.cmd run dev
endlocal
