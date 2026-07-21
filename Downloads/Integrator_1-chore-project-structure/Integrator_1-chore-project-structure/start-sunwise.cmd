@echo off
setlocal
echo [SunWise] Abriendo backend y frontend en terminales separadas...
start "SunWise Backend" cmd /k call "%~dp0backend\start-backend.cmd"
start "SunWise Frontend" cmd /k call "%~dp0frontend\start-frontend.cmd"
echo [SunWise] Frontend: http://localhost:5173
echo [SunWise] API: http://localhost:3000/api/health
endlocal
