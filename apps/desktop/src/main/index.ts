import { app, BrowserWindow } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { autoUpdater } from 'electron-updater'
import { startMcpServer } from '../mcp/server'
import { createWindow, getMainWindow } from './window'
import { createTray } from './tray'
import { registerIpcHandlers } from './ipc'

const isMcpMode = process.argv.includes('--mcp')

app.whenReady().then(() => {
  // Set app user model id for Windows
  electronApp.setAppUserModelId('app.getservo.servo')

  // Default open or close DevTools by F12 in development
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  if (isMcpMode) {
    // Headless MCP server mode - no GUI
    startMcpServer()
  } else {
    // GUI mode - show window and tray
    registerIpcHandlers()
    createWindow()
    createTray()

    // Check for updates in packaged app
    if (app.isPackaged) {
      autoUpdater.checkForUpdatesAndNotify()
    }
  }
})

app.on('activate', () => {
  // On macOS, re-create window when dock icon is clicked
  if (!isMcpMode && BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  } else {
    const mainWindow = getMainWindow()
    if (mainWindow) {
      mainWindow.show()
    }
  }
})

app.on('window-all-closed', () => {
  // On macOS, keep app running in tray even when all windows closed
  if (!isMcpMode && process.platform !== 'darwin') {
    app.quit()
  }
})
