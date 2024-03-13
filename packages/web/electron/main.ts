import { app, BrowserWindow, Tray } from 'electron'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { resolve } from 'path'
import { mainIPC } from './utils/ipc'
import handleTray from './utils/tray'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function createWindow() {
  const win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    center: true,
    title: '苍穹外卖',
    frame: false,
    webPreferences: {
      preload: resolve(__dirname, './preload/index.mjs'),
    }
  })
  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools()
    win.loadURL('http://localhost:5173')
  } else {
    const path = resolve(__dirname, './html/index.html')
    win.loadFile(path)
  }
  return win
}

app.whenReady().then(() => {
  const win = createWindow()
  
  handleTray('苍穹外卖', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    } else {
      if (win && !win.isVisible()) {
        win.show()
      }
    }
  })
  mainIPC(win)
})

app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') app.quit()
})
