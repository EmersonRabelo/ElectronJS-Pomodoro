const { app, BrowserWindow, ipcMain,Notification } = require('electron');

let mainWindow;

app.disableHardwareAcceleration();

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        // width: 300,
        //height: 160,
        frame: false,
        //alwaysOnTop: true,
        resizable: false,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true
        }
    });

    mainWindow.loadFile('index.html');

    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    // Manipulador para encerrar a aplicação
    ipcMain.on('close-app', () => {
        app.quit();
    });
});