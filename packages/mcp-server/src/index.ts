/**
 * Servo MCP Server
 *
 * A pure Node.js MCP server for desktop automation.
 * Provides tools for screenshots, clicking, typing, and window management.
 */

import { startMcpServer } from './server.js'
import { runSetup } from './setup.js'

// Handle --setup flag (configures Claude Code)
if (process.argv.includes('--setup')) {
  runSetup()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Setup failed:', error)
      process.exit(1)
    })
} else {
  // Normal MCP server startup
  startMcpServer().catch((error) => {
    console.error('Failed to start MCP server:', error)
    process.exit(1)
  })
}
