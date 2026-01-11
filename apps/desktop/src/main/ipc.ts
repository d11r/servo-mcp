import { ipcMain } from 'electron'
import { checkPermissions, requestAccessibility, requestScreenRecording } from './permissions'

export function registerIpcHandlers(): void {
  ipcMain.handle('get-permissions', () => {
    return checkPermissions()
  })

  ipcMain.handle('request-accessibility', () => {
    requestAccessibility()
  })

  ipcMain.handle('request-screen-recording', () => {
    requestScreenRecording()
  })
}
