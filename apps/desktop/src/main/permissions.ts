import { systemPreferences, shell } from 'electron'
import type { PermissionStatus } from '@servo/shared'

/**
 * Check current permission status on macOS.
 * On Windows, permissions are not required so we return true.
 */
export function checkPermissions(): PermissionStatus {
  if (process.platform !== 'darwin') {
    return { accessibility: true, screenRecording: true }
  }

  return {
    accessibility: systemPreferences.isTrustedAccessibilityClient(false),
    screenRecording: hasScreenRecordingPermission()
  }
}

/**
 * Request accessibility permission.
 * Opens System Preferences to the Accessibility pane.
 * Passing `true` to isTrustedAccessibilityClient triggers the permission prompt.
 */
export function requestAccessibility(): void {
  if (process.platform === 'darwin') {
    // This triggers the macOS permission prompt
    systemPreferences.isTrustedAccessibilityClient(true)
    // Also open System Preferences for manual granting
    shell.openExternal(
      'x-apple.systempreferences:com.apple.preference.security?Privacy_Accessibility'
    )
  }
}

/**
 * Request screen recording permission.
 * Opens System Preferences to the Screen Recording pane.
 */
export function requestScreenRecording(): void {
  if (process.platform === 'darwin') {
    shell.openExternal(
      'x-apple.systempreferences:com.apple.preference.security?Privacy_ScreenCapture'
    )
  }
}

/**
 * Check if screen recording permission is granted.
 * There's no direct API, so we check by attempting to get window info.
 */
function hasScreenRecordingPermission(): boolean {
  if (process.platform !== 'darwin') {
    return true
  }

  try {
    // On macOS 10.15+, CGWindowListCopyWindowInfo returns empty or null
    // for windows if screen recording permission is not granted.
    // We can check this via Electron's desktopCapturer or other means.
    // For now, we'll use a simple heuristic that may need refinement.

    // The getMediaAccessStatus API is available for screen recording
    const status = systemPreferences.getMediaAccessStatus('screen')
    return status === 'granted'
  } catch {
    // If the API is not available, assume not granted
    return false
  }
}
