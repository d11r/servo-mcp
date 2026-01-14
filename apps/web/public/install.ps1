# Servo installer for Windows
# Usage: irm https://getservo.app/install.ps1 | iex

$ErrorActionPreference = "Stop"

Write-Host "Installing Servo..." -ForegroundColor Cyan
Write-Host ""

# Set install directory
$installDir = "$env:LOCALAPPDATA\Servo"
$exePath = "$installDir\Servo.exe"

# Create directory
Write-Host "Creating directory: $installDir"
New-Item -ItemType Directory -Force -Path $installDir | Out-Null

# Download
Write-Host "Downloading from GitHub..."
$url = "https://github.com/d11r/getservo/releases/latest/download/Servo.exe"
Invoke-WebRequest -Uri $url -OutFile $exePath -UseBasicParsing

Write-Host "Installed to: $exePath" -ForegroundColor Green
Write-Host ""

# Run setup (configures Claude Code)
& $exePath --setup
