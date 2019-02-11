const electron = require("electron");

let mainWindow;

function createWindow () {
    mainWindow = new electron.BrowserWindow({
        width: 800,
        height: 600
    });

    mainWindow.loadURL("https://google.com/");

    mainWindow.on("closed", function () {
        mainWindow = null;
    });
}

electron.app.on("ready", createWindow);

electron.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron.app.quit();
    }
});

electron.app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
});
