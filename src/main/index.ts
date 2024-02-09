import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import axios from 'axios'
import { db } from '../database/index'
import { products } from '../database/schemas/product'
import { eq } from 'drizzle-orm'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    icon,
    frame: false,
    resizable: false,
    fullscreen: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
ipcMain.handle('speak', async (_, text) => {
  const key = 'AIzaSyBTfoVWuEQNb5cukjKVIIZ7gm8JpT7aNrY'
  const endpoint = `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${key}`

  const payload = {
    audioConfig: {
      audioEncoding: 'MP3',
      effectsProfileId: ['small-bluetooth-speaker-class-device'],
      pitch: -3.5,
      speakingRate: 1.05
    },
    input: {
      text
    },
    voice: {
      languageCode: 'pt-BR',
      name: 'pt-BR-Standard-B'
    }
  }

  const { data } = await axios.post(endpoint, payload)
  return data
})

ipcMain.handle('find-product-by-id', async (_, id) => {
  const data = db.select().from(products).where(eq(products.id, id)).get()

  return data
})

ipcMain.handle('create-product', async (_, product) => {
  const data = db.insert(products).values(product)

  return data
})

ipcMain.on('log', async (_, text) => {
  console.log(text)
})
