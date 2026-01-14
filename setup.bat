@echo off
REM PayFlow - Build and Development Script
REM This script helps you set up and run the project

echo.
echo ============================================
echo   PayFlow - Production Setup
echo ============================================
echo.

REM Check if Node is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/4] Checking Node.js...
node --version
echo.

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: npm is not installed
    pause
    exit /b 1
)

echo [2/4] Checking npm...
npm --version
echo.

REM Install dependencies
echo [3/4] Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo.

REM Build CSS
echo [4/4] Building Tailwind CSS...
call npm run tailwind:build
if errorlevel 1 (
    echo ERROR: Failed to build CSS
    pause
    exit /b 1
)
echo.

echo ============================================
echo   Setup Complete! ✅
echo ============================================
echo.
echo Your project is ready! To start development:
echo.
echo   Option 1 - Watch CSS changes:
echo   npm run tailwind:watch
echo.
echo   Option 2 - Run everything:
echo   npm run dev
echo.
echo Then open in browser:
echo   file:///c:/Users/Admin/paylow/payflow/index.html
echo.
pause
