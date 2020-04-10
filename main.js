const {app, BrowserWindow} = require('electron')
const path = require('path')
require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`)
})

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 200,
    height: 150,
    alwaysOnTop: true,
    frame: false,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.setResizable(false)
  mainWindow.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})