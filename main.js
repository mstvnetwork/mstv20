const { app, BrowserWindow, session } = require('electron');
function createWindow() {
  const win = new BrowserWindow({
    width: 1200, height: 800,
    webPreferences: { nodeIntegration: true, webSecurity: false }
  });
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['Referer'] = 'https://www.shemaroome.com';
    details.requestHeaders['Origin'] = 'https://www.shemaroome.com';
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });
  win.loadFile('index.html');
}
app.whenReady().then(createWindow);

