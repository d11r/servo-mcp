import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type { PermissionStatus } from '@servo/shared'

// Custom APIs for renderer
const api = {
  getPermissions: (): Promise<PermissionStatus> => ipcRenderer.invoke('get-permissions'),
  requestAccessibility: (): Promise<void> => ipcRenderer.invoke('request-accessibility'),
  requestScreenRecording: (): Promise<void> => ipcRenderer.invoke('request-screen-recording')
}

// Use `contextBridge` APIs to expose Electron APIs to renderer
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
