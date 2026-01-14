# servo-mcp

A desktop MCP server that gives AI agents the ability to see and control your desktop. Works on **macOS** and **Windows**.

[![npm version](https://img.shields.io/npm/v/servo-mcp.svg)](https://www.npmjs.com/package/servo-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install -g servo-mcp
npx servo-mcp --setup
```

## macOS Permissions

Grant permissions to your **terminal app** (Terminal, iTerm, VS Code, Cursor) in **System Settings > Privacy & Security**:

- **Accessibility** - for mouse clicks, keyboard input, and UI element access
- **Screen Recording** - for taking screenshots

Child processes like servo-mcp inherit permissions from the parent terminal app.

## Windows

No special permissions required.

## What it does

Servo is an [MCP (Model Context Protocol)](https://modelcontextprotocol.io) server that enables Claude Code and other AI agents to:

- Take screenshots of your screen
- Click buttons and interact with UI elements
- Type text and press keyboard shortcuts
- Scroll and navigate applications
- **Access UI elements via accessibility APIs** (faster than vision)
- Verify that code changes actually work

## Architecture

Servo uses **native pre-built binaries** for maximum performance and zero runtime dependencies:

- **macOS**: Swift binary using CoreGraphics and Accessibility APIs
- **Windows**: C# binary using Win32 and UI Automation APIs

No Python, no PowerShell, no interpreters at runtime. Just fast, native code.

## Available Tools

### Coordinate-based tools

| Tool | Description |
|------|-------------|
| `screenshot` | Capture screen |
| `click` | Click at x,y coordinates |
| `type_text` | Type text at cursor |
| `key_press` | Press key combo (e.g., Cmd+S) |
| `scroll` | Scroll up/down/left/right |
| `move_mouse` | Move cursor to x,y |
| `get_mouse_position` | Get cursor position |
| `focus_app` | Bring app to foreground |
| `open_app` | Launch application |
| `list_windows` | List open windows |
| `wait` | Wait milliseconds |
| `request_permissions` | Open System Preferences |

### Accessibility-based tools (NEW in v0.4.0)

| Tool | Description |
|------|-------------|
| `list_ui_elements` | Get UI elements with labels, roles, and bounds |
| `click_element` | Click element by title/role/identifier (no coordinates needed) |
| `get_element_text` | Read text content from an element |
| `focus_element` | Focus an element like a text field |

**Accessibility tools are faster and more reliable** than screenshot + vision for UI automation. Instead of analyzing images to find buttons, Claude can directly query the accessibility tree and click elements by name.

## Configuration

After running `npx servo-mcp --setup`, your `~/.claude.json` will contain:

```json
{
  "mcpServers": {
    "servo": {
      "command": "npx",
      "args": ["servo-mcp"]
    }
  }
}
```

Restart Claude Code and test with: "take a screenshot" or "list the UI elements"

## Links

- **Website:** [servo-mcp.com](https://servo-mcp.com)
- **GitHub:** [github.com/d11r/servo-mcp](https://github.com/d11r/servo-mcp)

## License

MIT
