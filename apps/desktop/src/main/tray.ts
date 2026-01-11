import { Tray, Menu, app, nativeImage } from 'electron'
import { join } from 'path'
import { showMainWindow } from './window'
import { checkPermissions } from './permissions'

let tray: Tray | null = null

export function createTray(): Tray {
  // Create tray icon - use template image for macOS
  const iconPath = join(__dirname, '../../resources/iconTemplate.png')
  const icon = nativeImage.createFromPath(iconPath)

  // For macOS, use template image (16x16 or 22x22 for retina)
  if (process.platform === 'darwin') {
    icon.setTemplateImage(true)
  }

  tray = new Tray(icon.isEmpty() ? createDefaultIcon() : icon)
  tray.setToolTip('Servo')

  updateTrayMenu()

  tray.on('click', () => {
    showMainWindow()
  })

  return tray
}

function createDefaultIcon(): nativeImage {
  // Create a simple 16x16 icon if the file doesn't exist
  return nativeImage.createEmpty()
}

export function updateTrayMenu(): void {
  if (!tray) return

  const permissions = checkPermissions()
  const isReady = permissions.accessibility && permissions.screenRecording

  const statusLabel = isReady ? 'Status: Ready' : 'Status: Permissions Required'

  const contextMenu = Menu.buildFromTemplate([
    { label: statusLabel, enabled: false },
    { type: 'separator' },
    { label: 'Open Servo', click: showMainWindow },
    { type: 'separator' },
    { label: 'Quit Servo', click: () => app.quit() }
  ])

  tray.setContextMenu(contextMenu)
}
