import { Menu, Tray, app } from 'electron'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default function handleTray(title: string, callback: Function) {
  const icoPath = resolve(__dirname, 'favicon.png')
  const tray = new Tray(icoPath)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '退出',
      click() {
        app.quit()
      },
    },
  ])
  tray.setTitle(title)
  tray.setToolTip(title)
  tray.setContextMenu(contextMenu)

  tray.on('click', () => callback())

}