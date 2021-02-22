import { app, BrowserWindow, Menu } from 'electron'
import log from './main/utils/logging'
import * as setupUtils from './main/setup/utils'
import logger from './main/utils/logging'
import { addIpcHandlers } from './main/setup/ipc'

declare const MAIN_WINDOW_WEBPACK_ENTRY: any
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: any

// initialize on load
initialize()

/**
 * Perform app initialization
 */
function initialize(): void {
  // First, make sure everything is up to date
  update()

  // Get some config info
  const initSettings = setupUtils.processCmdArgs()
  const platform = setupUtils.getPlatform()
  const devToolsWidth = initSettings.isDev ? 300 : 0

  // Development mode only setup
  // if (initSettings.isDev) {
  //   setupUtils.setDevToolsDefaultWidth(devToolsWidth)
  // }

  // Add lifecycle events
  setupAppEventHandlers({ platform, isDev: initSettings.isDev, devToolsWidth })

  // Setup ipc
  addIpcHandlers()
}

/**
 * Perform Windows installation/updates
 */
function update(): void {
  if (require('electron-squirrel-startup')) {
    log.error('Updates failed')
    app.quit()
  }
  log.success('Updated successfully')
}

/**
 * Create the initial browser window
 * @param isDev Flag to indicate whether we're in development mode
 * @param devToolsWidth Width to use for the chrome dev tools
 */
function createMainWindow(
  isDev: boolean,
  devToolsWidth: number
): BrowserWindow {
  return setupUtils.createWindow(
    MAIN_WINDOW_WEBPACK_ENTRY,
    undefined,
    isDev,
    devToolsWidth,
    MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
  )
}

/**
 * Create handlers for app lifetime eventss
 * @param args Lifecycle event initialization parameters
 */
function setupAppEventHandlers(args: ILifecycleArgs) {
  // Fires once when electron finishes initializing
  app.on('ready', () => onReady(args))

  // Fires when all windows have been closed
  app.on('window-all-closed', () => onAllWindowsClosed(args))

  // Fires when the app is activated (initial launch, relaunch, clicking taskbar icon, etc.)
  app.on('activate', () => onActivate(args))
}

//#region Lifecycle Handlers

interface ILifecycleArgs {
  platform: setupUtils.platform
  isDev: boolean
  devToolsWidth: number
}

/**
 * Perform initialization actions on app ready
 * @param args Lifecycle event initialization parameters
 */
const onReady = (args: ILifecycleArgs) => {
  log.info('App ready')
  // Open main window
  createMainWindow(args.isDev, args.devToolsWidth)

  // Create toolbar menu
  const mainMenu = Menu.buildFromTemplate(
    setupUtils.buildMenuConfig(args.platform, args.isDev)
  )
  Menu.setApplicationMenu(mainMenu)
}

/**
 * Perform cleanup when all windows are closed
 * @param args Lifecycle event initialization parameters
 */
const onAllWindowsClosed = (args: ILifecycleArgs) => {
  log.info('All windows closed')

  // Standard mac behavior is to NOT quit application when the window closes.
  // Other platforms should close by default
  if (args.platform !== setupUtils.platform.mac) {
    app.quit()
  }
}

/**
 * Make sure we have an open widow when app is activated
 * @param args Lifecycle event initialization parameters
 */
const onActivate = (args: ILifecycleArgs) => {
  log.info('App activated')

  // Ensure we have a window open
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow(args.isDev, args.devToolsWidth)
  }
}
//#endregion Lifecycle Handlers
