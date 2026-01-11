import type { ElectronAPI } from '@electron-toolkit/preload'
import type { PermissionStatus } from '@servo/shared'

interface ServoAPI {
  getPermissions: () => Promise<PermissionStatus>
  requestAccessibility: () => Promise<void>
  requestScreenRecording: () => Promise<void>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: ServoAPI
  }
}
