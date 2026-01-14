#!/bin/bash
# Servo installer for macOS
# Usage: curl -fsSL https://getservo.app/install.sh | bash

set -e

echo "Installing Servo..."
echo ""

# Check for macOS
if [ "$(uname)" != "Darwin" ]; then
  echo "Error: This installer is for macOS only."
  echo "For Windows, use: irm https://getservo.app/install.ps1 | iex"
  exit 1
fi

# Detect architecture
ARCH=$(uname -m)
if [ "$ARCH" = "arm64" ]; then
  ZIP_URL="https://github.com/d11r/getservo/releases/latest/download/Servo-macos-arm64.zip"
  echo "Detected: macOS (Apple Silicon)"
else
  ZIP_URL="https://github.com/d11r/getservo/releases/latest/download/Servo-macos-x64.zip"
  echo "Detected: macOS (Intel)"
fi

# Download
echo "Downloading from GitHub..."
curl -fsSL "$ZIP_URL" -o /tmp/Servo.zip

# Extract
echo "Extracting..."
unzip -oq /tmp/Servo.zip -d /tmp/

# Install
echo "Installing to /Applications..."
rm -rf /Applications/Servo.app 2>/dev/null || true
mv /tmp/Servo.app /Applications/

# Cleanup
rm /tmp/Servo.zip

# Run setup (configures Claude Code)
echo ""
/Applications/Servo.app/Contents/MacOS/Servo --setup
