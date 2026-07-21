@echo off
setlocal
cd /d "%~dp0"
if not exist ".env" (
  copy /y ".env.example" ".env" >nul
  echo [SunWise] Se creo backend\.env desde .env.example.
)
echo [SunWise] Instalando dependencias del backend...
call npm.cmd install
if errorlevel 1 exit /b 1
echo [SunWise] Iniciando PostgreSQL local...
docker compose up -d --wait
if errorlevel 1 exit /b 1
echo [SunWise] Creando tablas y datos iniciales...
call npm.cmd run db:sync
if errorlevel 1 exit /b 1
call npm.cmd run db:seed
if errorlevel 1 exit /b 1
echo [SunWise] Configuracion terminada correctamente.
echo.
echo [SunWise] La base de datos ya esta lista.
echo [SunWise] Para iniciar la API ejecuta: .\start-backend.cmd
echo [SunWise] Despues abre: http://localhost:3000/api
endlocal
