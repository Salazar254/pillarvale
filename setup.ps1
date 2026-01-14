#!/usr/bin/env pwsh
# PayFlow - Build and Development Script (PowerShell)
# Usage: .\setup.ps1

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   PayFlow - Production Setup" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node is installed
try {
    $nodeVersion = node --version
    Write-Host "[1/4] Checking Node.js..." -ForegroundColor Green
    Write-Host "      $nodeVersion" -ForegroundColor Gray
} catch {
    Write-Host "ERROR: Node.js is not installed" -ForegroundColor Red
    Write-Host "Please install from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "[2/4] Checking npm..." -ForegroundColor Green
    Write-Host "      $npmVersion" -ForegroundColor Gray
} catch {
    Write-Host "ERROR: npm is not installed" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Install dependencies
Write-Host "[3/4] Installing dependencies..." -ForegroundColor Green
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to install dependencies" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Build CSS
Write-Host "[4/4] Building Tailwind CSS..." -ForegroundColor Green
npm run tailwind:build
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to build CSS" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "   Setup Complete! ✅" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your project is ready! To start development:" -ForegroundColor Cyan
Write-Host ""
Write-Host "   Option 1 - Watch CSS changes:" -ForegroundColor White
Write-Host "   npm run tailwind:watch" -ForegroundColor Gray
Write-Host ""
Write-Host "   Option 2 - Run everything:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "Then open in browser:" -ForegroundColor White
Write-Host "   file:///c:/Users/Admin/paylow/payflow/index.html" -ForegroundColor Gray
Write-Host ""
