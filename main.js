const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const { autoUpdater, AppUpdater } = require("electron-updater");

let mainWindow;


autoUpdater.autoDownload = false;
autoUpdater.autoInstallonAppQ = true;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // // Cargar la versión adecuada de React según si está en modo de desarrollo o producción
  if (isDev) {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    mainWindow.loadFile(path.join(__dirname, "build", "index.html"));
  }

  // mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));
  // Quit app when main window is closed
  mainWindow.on("closed", function () {
    mainWindow = null;
    app.quit();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  autoUpdater.checkForUpdates()
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
