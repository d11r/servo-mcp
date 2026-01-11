import {
  mouse,
  keyboard,
  screen,
  straightTo,
  Point,
  Button,
  Key
} from '@nut-tree/nut-js'
import { exec } from 'child_process'
import { promisify } from 'util'
import type { MousePosition, ScrollDirection, WindowInfo } from '@servo/shared'

const execAsync = promisify(exec)

// Configure nut-js for minimal delay
mouse.config.autoDelayMs = 0
keyboard.config.autoDelayMs = 0

/**
 * Capture a screenshot of the entire screen.
 * Returns the image as a PNG buffer.
 */
export async function screenshot(): Promise<Buffer> {
  const image = await screen.grab()
  return await image.toPng()
}

/**
 * Click at the specified screen coordinates.
 */
export async function click(
  x: number,
  y: number,
  button: 'left' | 'right' | 'middle' = 'left',
  clicks = 1
): Promise<void> {
  await mouse.move(straightTo(new Point(x, y)))

  const btn =
    button === 'right' ? Button.RIGHT : button === 'middle' ? Button.MIDDLE : Button.LEFT

  for (let i = 0; i < clicks; i++) {
    await mouse.click(btn)
  }
}

/**
 * Type text at the current cursor position.
 */
export async function typeText(text: string): Promise<void> {
  await keyboard.type(text)
}

/**
 * Press a key with optional modifiers.
 */
export async function keyPress(key: string, modifiers: string[] = []): Promise<void> {
  const mappedModifiers = modifiers.map(mapModifier)
  const mappedKey = mapKey(key)

  // Press all modifiers
  for (const mod of mappedModifiers) {
    await keyboard.pressKey(mod)
  }

  // Press and release the main key
  await keyboard.pressKey(mappedKey)
  await keyboard.releaseKey(mappedKey)

  // Release all modifiers in reverse order
  for (const mod of mappedModifiers.reverse()) {
    await keyboard.releaseKey(mod)
  }
}

/**
 * Scroll in a direction.
 */
export async function scroll(direction: ScrollDirection, amount = 3): Promise<void> {
  const scrollAmount = direction === 'up' || direction === 'left' ? -amount : amount

  if (direction === 'up' || direction === 'down') {
    await mouse.scrollDown(scrollAmount)
  } else {
    await mouse.scrollRight(scrollAmount)
  }
}

/**
 * Move the mouse cursor to coordinates.
 */
export async function moveMouse(x: number, y: number): Promise<void> {
  await mouse.move(straightTo(new Point(x, y)))
}

/**
 * Get the current mouse position.
 */
export async function getMousePosition(): Promise<MousePosition> {
  const pos = await mouse.getPosition()
  return { x: pos.x, y: pos.y }
}

/**
 * Focus an application by name.
 */
export async function focusApp(appName: string): Promise<void> {
  if (process.platform === 'darwin') {
    await execAsync(`osascript -e 'tell application "${appName}" to activate'`)
  } else {
    // Windows: use PowerShell to focus window
    await execAsync(
      `powershell -command "(New-Object -ComObject WScript.Shell).AppActivate('${appName}')"`
    )
  }
}

/**
 * Open/launch an application.
 */
export async function openApp(appName: string): Promise<void> {
  if (process.platform === 'darwin') {
    await execAsync(`open -a "${appName}"`)
  } else {
    await execAsync(`start "" "${appName}"`)
  }
}

/**
 * List all open windows.
 */
export async function listWindows(): Promise<WindowInfo[]> {
  if (process.platform === 'darwin') {
    const script = `
      tell application "System Events"
        set windowList to {}
        repeat with proc in (every process whose background only is false)
          set procName to name of proc
          repeat with win in (every window of proc)
            set winTitle to name of win
            set end of windowList to procName & "|" & winTitle
          end repeat
        end repeat
        return windowList
      end tell
    `
    try {
      const { stdout } = await execAsync(`osascript -e '${script.replace(/'/g, "'\\''")}'`)
      return parseAppleScriptWindowList(stdout)
    } catch {
      return []
    }
  } else {
    // Windows: use PowerShell
    try {
      const { stdout } = await execAsync(
        `powershell -command "Get-Process | Where-Object {$_.MainWindowTitle} | Select-Object ProcessName, MainWindowTitle | ConvertTo-Json"`
      )
      const data = JSON.parse(stdout || '[]')
      const windows = Array.isArray(data) ? data : [data]
      return windows.map((w) => ({
        app: w.ProcessName || '',
        title: w.MainWindowTitle || '',
        bounds: { x: 0, y: 0, width: 0, height: 0 },
        focused: false
      }))
    } catch {
      return []
    }
  }
}

/**
 * Wait for a specified duration.
 */
export async function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Helper functions

function parseAppleScriptWindowList(output: string): WindowInfo[] {
  // AppleScript returns comma-separated list like: "App1|Title1, App2|Title2"
  const windows: WindowInfo[] = []
  const items = output.split(',').map((s) => s.trim())

  for (const item of items) {
    const [app, title] = item.split('|')
    if (app && title) {
      windows.push({
        app: app.trim(),
        title: title.trim(),
        bounds: { x: 0, y: 0, width: 0, height: 0 },
        focused: false
      })
    }
  }

  return windows
}

function mapModifier(modifier: string): Key {
  const modifierMap: Record<string, Key> = {
    ctrl: Key.LeftControl,
    control: Key.LeftControl,
    alt: Key.LeftAlt,
    option: Key.LeftAlt,
    shift: Key.LeftShift,
    meta: Key.LeftSuper,
    cmd: Key.LeftSuper,
    command: Key.LeftSuper,
    win: Key.LeftSuper,
    super: Key.LeftSuper
  }

  return modifierMap[modifier.toLowerCase()] || Key.LeftControl
}

function mapKey(key: string): Key {
  // Common key mappings
  const keyMap: Record<string, Key> = {
    enter: Key.Return,
    return: Key.Return,
    tab: Key.Tab,
    space: Key.Space,
    backspace: Key.Backspace,
    delete: Key.Delete,
    escape: Key.Escape,
    esc: Key.Escape,
    up: Key.Up,
    down: Key.Down,
    left: Key.Left,
    right: Key.Right,
    home: Key.Home,
    end: Key.End,
    pageup: Key.PageUp,
    pagedown: Key.PageDown,
    f1: Key.F1,
    f2: Key.F2,
    f3: Key.F3,
    f4: Key.F4,
    f5: Key.F5,
    f6: Key.F6,
    f7: Key.F7,
    f8: Key.F8,
    f9: Key.F9,
    f10: Key.F10,
    f11: Key.F11,
    f12: Key.F12
  }

  const lowerKey = key.toLowerCase()

  if (keyMap[lowerKey]) {
    return keyMap[lowerKey]
  }

  // For single characters, use the Key enum directly
  if (key.length === 1) {
    const upperKey = key.toUpperCase()
    if (upperKey >= 'A' && upperKey <= 'Z') {
      return Key[upperKey as keyof typeof Key]
    }
    if (upperKey >= '0' && upperKey <= '9') {
      return Key[`Num${upperKey}` as keyof typeof Key]
    }
  }

  // Default to the key name directly if it exists in the enum
  if (key in Key) {
    return Key[key as keyof typeof Key]
  }

  throw new Error(`Unknown key: ${key}`)
}
