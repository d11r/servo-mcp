# Servo

A desktop MCP server for AI agents. Gives Claude Code the tools to see your screen, click buttons, type text, and verify its work on macOS and Windows.

**Open source. 100% local. No telemetry.**

## What is Servo?

Servo is an [MCP (Model Context Protocol)](https://modelcontextprotocol.io) server that provides desktop automation tools. When connected to Claude Code, it enables AI to:

- Take screenshots to see your desktop
- Click buttons and interact with UI elements
- Type text and use keyboard shortcuts
- Scroll, navigate, and control applications
- Verify that code changes actually work

## Why a Desktop App?

macOS and Windows require explicit user permission for screen recording and accessibility features. A proper app bundle appears in System Preferences, allowing users to grant these permissions elegantly.

## Repository Structure

This is a **pnpm monorepo** containing:

```
getservo/
├── apps/
│   ├── web/          # Marketing website (getservo.app) - Next.js
│   └── desktop/      # Electron desktop app with MCP server
├── packages/
│   └── shared/       # Shared types and constants
├── pnpm-workspace.yaml
└── turbo.json
```

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/d11r/servo.git
cd servo

# Install dependencies
pnpm install
```

### Development

```bash
# Run all apps in dev mode
pnpm dev

# Run website only (http://localhost:3000)
pnpm dev:web

# Run desktop app only
pnpm dev:desktop
```

### Build

```bash
# Build all
pnpm build

# Build website
pnpm build:web

# Build desktop app for current platform
pnpm build:desktop
```

## MCP Tools

| Tool | Description |
|------|-------------|
| `screenshot` | Capture screen or window (returns base64 image) |
| `click` | Click at x,y coordinates (left/right/double) |
| `type_text` | Type text at cursor position |
| `key_press` | Press keyboard shortcut (e.g., Cmd+S) |
| `scroll` | Scroll up/down/left/right |
| `move_mouse` | Move cursor to x,y |
| `get_mouse_position` | Get current cursor position |
| `focus_app` | Bring application to foreground |
| `open_app` | Launch an application |
| `list_windows` | List all open windows |
| `wait` | Wait for specified milliseconds |

## Claude Code Configuration

Add to your Claude Code settings (`~/.claude.json`):

```json
{
  "mcpServers": {
    "servo": {
      "command": "/Applications/Servo.app/Contents/MacOS/Servo",
      "args": ["--mcp"]
    }
  }
}
```

On Windows:
```json
{
  "mcpServers": {
    "servo": {
      "command": "C:\\Program Files\\Servo\\Servo.exe",
      "args": ["--mcp"]
    }
  }
}
```

## Permissions

### macOS

Servo requires two permissions:

1. **Screen Recording** - For taking screenshots
2. **Accessibility** - For mouse clicks, keyboard input, and scrolling

The app will guide you through granting these permissions on first launch.

### Windows

Run the app as Administrator for full functionality.

## Tech Stack

- **Desktop App**: Electron + electron-vite
- **Website**: Next.js 15 + React 19 + Tailwind CSS 4
- **MCP SDK**: @modelcontextprotocol/sdk
- **Automation**: Native APIs (screencapture, Quartz, AppleScript on macOS; PowerShell, Win32 on Windows)

## License

MIT License - see [LICENSE](LICENSE) for details.

## Author

Created by [Dragos Strugar](https://dragosstrugar.com) ([@d11r](https://github.com/d11r))
