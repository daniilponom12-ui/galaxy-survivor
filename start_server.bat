@echo off
cd /d "%~dp0"
echo Запуск локального сервера для теста на http://localhost:8000
start http://localhost:8000
python -m http.server 8000