import path from 'path'
import fs from 'fs'
import { app, BrowserWindow, Menu } from 'electron'
import { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import log from './main/utils/logging'
import * as setupUtils from './main/setup/utils'

declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

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
  if (initSettings.isDev) {
    setDevToolsDefaultWidth(devToolsWidth)
  }

  // Add lifecycle events
  setupAppEventHandlers(platform, initSettings.isDev, devToolsWidth)
}

/**
 * Perform Windows installation/updates
 */
function update(): void {
  if (require('electron-squirrel-startup')) {
    log.error('Updates failed')
    app.quit();
  }
  log.success('Updated successfully')
}

/**
 * Set default dev tools size in user preferences so app window size exactly matches what we'd see in production
 * @param width Default width for our chrome devtools
 */
function setDevToolsDefaultWidth(width: number): void {
  const userDataPath = app.getPath("userData");
  const prefPath = path.join(userDataPath, "Preferences");
  const prefs = JSON.parse(fs.readFileSync(prefPath, "utf-8"));
  prefs.electron.devtools = {
    ...(prefs.electron.devtools || {}),
    preferences: {
      ...((prefs.electron.devtools || {}).preferences || {}),
      "InspectorView.splitViewState": JSON.stringify({
        // Seems like vertical and horizontal size are switched
        // This should set the width
        vertical: { size: width },
      })
    },
  };
  fs.writeFileSync(prefPath, JSON.stringify(prefs));
}

/**
 * Create the initial browser window
 * @param isDev Flag to indicate whether we're in development mode
 * @param devToolsWidth Width to use for the chrome dev tools
 */
function createMainWindow(isDev: boolean, devToolsWidth: number): BrowserWindow {
  return setupUtils.createWindow(MAIN_WINDOW_WEBPACK_ENTRY, undefined , isDev, devToolsWidth)
}

/**
 * Create handlers for app lifetime eventss
 * @param platform Which system platform we're running
 * @param [isDev] Flag to indicate whether we're in development mode
 * @param [devToolsWidth] Width to use for the chrome dev tools
 */
function setupAppEventHandlers(platform: setupUtils.platform, isDev: boolean = false, devToolsWidth: number = 0) {
  // Fires once when electron finishes initializing
  app.on('ready', () => {
    log.info('App ready')
    // Open main window
    createMainWindow(isDev, devToolsWidth)
  
    // Create toolbar menu
    const mainMenu = Menu.buildFromTemplate(setupUtils.buildMenuConfig(platform, isDev))
    Menu.setApplicationMenu(mainMenu)

    // Install developer extensions
    if (isDev) {
      setupUtils.installDevTool(REACT_DEVELOPER_TOOLS)
    }
  });
  
  // Fires when all windows have been closed
  app.on('window-all-closed', () => {
    log.info('All windows closed')

    // Standard mac behavior is to NOT quit application when the window closes. 
    // Other platforms should close by default
    if (platform !== setupUtils.platform.mac) {
      app.quit();
    }
  });
  
  // Fires when the app is activated (initial launch, relaunch, clicking taskbar icon, etc.)
  app.on('activate', () => {
    log.info('App activated')

    // Ensure we have a window open
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow(isDev, devToolsWidth);
    }
  });
}



