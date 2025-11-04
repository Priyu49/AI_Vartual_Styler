# Frontend Startup Script
Write-Host "🚀 Starting Juno Frontend Server..." -ForegroundColor Green
Write-Host ""

if (Test-Path "project-juno\frontend") {
    Set-Location "project-juno\frontend"
} elseif (Test-Path "frontend") {
    Set-Location "frontend"
} else {
    Write-Host "❌ Frontend directory not found!" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
}

if (-not (Test-Path ".env.local")) {
    Write-Host "⚠️  Creating .env.local file..." -ForegroundColor Yellow
    @"
NEXT_PUBLIC_API_URL=http://localhost:5000
"@ | Out-File -FilePath ".env.local" -Encoding utf8
    Write-Host "✅ Created .env.local" -ForegroundColor Green
    Write-Host ""
}

Write-Host "▶️  Starting development server..." -ForegroundColor Cyan
Write-Host ""
npm run dev

