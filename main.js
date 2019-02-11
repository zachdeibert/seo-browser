const electron = require("electron");

let mainWindow;

function createWindow () {
    mainWindow = new electron.BrowserWindow({
        "width": 800,
        "height": 600,
        "webPreferences": {
            "nodeIntegration": false
        }
    });

    electron.session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
        details.requestHeaders["User-Agent"] = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
        callback({
            "cancel": false,
            "requestHeaders": details.requestHeaders
        });
    });

    mainWindow.loadFile("render.html");

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
