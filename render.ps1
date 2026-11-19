<#
.SYNOPSIS
    Render script for SHIFTBID 6100 Promotional Video (PowerShell)

.DESCRIPTION
    Renders the cinematic promotional video using Remotion CLI

.PARAMETER Preview
    Render 30-second preview version (faster)

.PARAMETER Still
    Extract single frame at 60 seconds

.PARAMETER Help
    Show help message

.EXAMPLE
    .\render.ps1
    .\render.ps1 -Preview
    .\render.ps1 -Still
#>

param(
    [switch]$Preview,
    [switch]$Still,
    [switch]$Help
)

if ($Help) {
    Write-Host "🎬 SHIFTBID 6100 - Cinematic Promotional Video Renderer" -ForegroundColor Cyan
    Write-Host "======================================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Usage: .\render.ps1 [options]"
    Write-Host ""
    Write-Host "Options:"
    Write-Host "  -Preview    Render 30-second preview (faster)"
    Write-Host "  -Still      Extract single frame at 60s"
    Write-Host "  -Help       Show this help"
    exit 0
}

Write-Host "🎬 SHIFTBID 6100 - Cinematic Promotional Video Renderer" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host ""

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
}

if ($Preview) {
    Write-Host "🔄 Rendering 30-second preview..." -ForegroundColor Green
    npx remotion render --concurrency=4 ShiftBidPromoPreview out/shiftbid-promo-preview.mp4 --props '{"preview":true}'
    Write-Host "✅ Preview rendered: out/shiftbid-promo-preview.mp4" -ForegroundColor Green
}
elseif ($Still) {
    Write-Host "📸 Extracting frame at 60 seconds (frame 1800)..." -ForegroundColor Green
    npx remotion still ShiftBidPromoStill out/frame.png --frame=1800
    Write-Host "✅ Still extracted: out/frame.png" -ForegroundColor Green
}
else {
    Write-Host "🔄 Rendering full 90-second video (this may take several minutes)..." -ForegroundColor Green
    npx remotion render --concurrency=4 ShiftBidPromoVideo out/shiftbid-promo.mp4
    Write-Host "✅ Full video rendered: out/shiftbid-promo.mp4" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 Done! Output files are in the 'out/' directory." -ForegroundColor Cyan