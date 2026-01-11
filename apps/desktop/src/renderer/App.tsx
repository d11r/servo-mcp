import { useState, useEffect } from 'react'
import { PermissionCard } from './components/PermissionCard'
import { StatusIndicator } from './components/StatusIndicator'
import type { PermissionStatus } from '@servo/shared'

export function App() {
  const [permissions, setPermissions] = useState<PermissionStatus>({
    accessibility: false,
    screenRecording: false
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initial permission check
    window.api.getPermissions().then((perms) => {
      setPermissions(perms)
      setLoading(false)
    })

    // Poll for permission changes every 2 seconds
    const interval = setInterval(async () => {
      const perms = await window.api.getPermissions()
      setPermissions(perms)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const isReady = permissions.accessibility && permissions.screenRecording
  const isMac = navigator.platform.toLowerCase().includes('mac')

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 pt-10">
      {/* Header with drag region */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Servo</h1>
        <StatusIndicator ready={isReady} />
      </div>

      {/* Permissions section - only show on macOS when not ready */}
      {isMac && !isReady && (
        <div className="space-y-3 mb-6">
          <p className="text-sm text-gray-400 mb-3">
            Servo needs permissions to control your desktop:
          </p>
          <PermissionCard
            name="Accessibility"
            description="Required for mouse clicks and keyboard input"
            granted={permissions.accessibility}
            onRequest={() => window.api.requestAccessibility()}
          />
          <PermissionCard
            name="Screen Recording"
            description="Required for taking screenshots"
            granted={permissions.screenRecording}
            onRequest={() => window.api.requestScreenRecording()}
          />
        </div>
      )}

      {/* Ready state */}
      {isReady && (
        <div className="space-y-4">
          <p className="text-sm text-gray-300">
            Servo is ready. Add it to Claude Code:
          </p>
          <pre className="text-gray-300">
            <code>{`{
  "mcpServers": {
    "servo": {
      "command": "${isMac ? '/Applications/Servo.app/Contents/MacOS/Servo' : 'C:\\\\Program Files\\\\Servo\\\\Servo.exe'}",
      "args": ["--mcp"]
    }
  }
}`}</code>
          </pre>
          <p className="text-xs text-gray-500">
            Add this to ~/.claude.json or Claude Code settings
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="absolute bottom-4 left-6 right-6 text-xs text-gray-500 flex justify-between">
        <span>v0.1.0</span>
        <a
          href="https://github.com/d11r/servo"
          className="hover:text-gray-300 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </div>
  )
}
