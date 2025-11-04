# Backend Startup Script
Write-Host "🚀 Starting Juno Backend Server..." -ForegroundColor Green
Write-Host ""

if (Test-Path "project-juno\backend") {
    Set-Location "project-juno\backend"
} elseif (Test-Path "backend") {
    Set-Location "backend"
} else {
    Write-Host "❌ Backend directory not found!" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
}

if (-not (Test-Path ".env")) {
    Write-Host "⚠️  WARNING: .env file not found!" -ForegroundColor Red
    Write-Host "Please create a .env file in project-juno/backend/ with your API keys" -ForegroundColor Yellow
    Write-Host "See .env.example for reference" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "▶️  Starting development server..." -ForegroundColor Cyan
Write-Host ""
npm run dev

