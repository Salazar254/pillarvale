@echo off
echo Starting PayFlow MVP...

:: Start API in background
start "PayFlow API" cmd /k "cd mvp\api && npm start"

:: Start Frontend Server (using Python if available, or just keeping the window open for instructions)
echo.
echo API Server running on http://localhost:3000
echo.
echo To serve the frontend, you can use Python:
echo python -m http.server 8000 --directory mvp
echo.
echo Then access:
echo - Dashboard: http://localhost:8000/dashboard/
echo - Test Site: http://localhost:8000/test/merchant-site.html
echo.
pause
