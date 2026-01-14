/**
 * Setup command for Servo
 *
 * Configures Claude Code to use Servo as an MCP server.
 * Run with: Servo --setup
 */

import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
import { execSync } from 'child_process'

interface ClaudeConfig {
  mcpServers?: Record<string, { command: string; args?: string[] }>
  [key: string]: unknown
}

export async function runSetup(): Promise<void> {
  const platform = os.platform()
  const configPath = path.join(os.homedir(), '.claude.json')

  // Determine executable path based on platform
  let exePath: string
  if (platform === 'win32') {
    const localAppData = process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local')
    exePath = path.join(localAppData, 'Servo', 'Servo.exe')
  } else {
    exePath = '/Applications/Servo.app/Contents/MacOS/Servo'
  }

  // Read existing config or create new
  let config: ClaudeConfig = {}
  if (fs.existsSync(configPath)) {
    try {
      const content = fs.readFileSync(configPath, 'utf-8')
      config = JSON.parse(content)
    } catch {
      // Invalid JSON - backup and start fresh
      const backupPath = `${configPath}.backup`
      fs.copyFileSync(configPath, backupPath)
      console.log(`Backed up existing config to: ${backupPath}`)
    }
  }

  // Add/update MCP server config
  if (!config.mcpServers) {
    config.mcpServers = {}
  }
  config.mcpServers.servo = {
    command: exePath
  }

  // Write config
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n')

  // Print success message
  console.log('')
  console.log('\x1b[32m%s\x1b[0m', 'Servo installed and configured!')
  console.log('')

  if (platform === 'darwin') {
    console.log('Next steps:')
    console.log('')
    console.log('1. Grant permissions in System Settings > Privacy & Security:')
    console.log('   - Accessibility (required for clicking/typing)')
    console.log('   - Screen Recording (required for screenshots)')
    console.log('')
    console.log('2. Restart Claude Code')
    console.log('')
    console.log('3. Test with: "take a screenshot"')
    console.log('')

    // Open System Preferences to Accessibility pane
    try {
      execSync('open "x-apple.systempreferences:com.apple.preference.security?Privacy_Accessibility"', {
        stdio: 'ignore'
      })
    } catch {
      // Ignore errors opening System Preferences
    }
  } else if (platform === 'win32') {
    console.log('Next steps:')
    console.log('')
    console.log('1. Restart Claude Code')
    console.log('')
    console.log('2. Test with: "take a screenshot"')
    console.log('')
    console.log('Note: Windows may prompt for permissions when Servo runs.')
    console.log('')
  } else {
    console.log('Next steps:')
    console.log('')
    console.log('1. Restart Claude Code')
    console.log('')
    console.log('2. Test with: "take a screenshot"')
    console.log('')
  }
}
