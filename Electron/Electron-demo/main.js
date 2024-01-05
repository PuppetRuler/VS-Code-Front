console.log("ready~~");

const { app, BrowserWindow } = require("electron");
// 处理路径
const path = require('path');

// 1. 创建应用窗口
function createWindow() {
    // 实例化应用窗口
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        titleBarStyle: "hidden",
        titleBarOverlay: true,
        webPreferences: {
            preload: path.join(__dirname, './preload.js')
        }
    });
    // 打开控制台
    win.webContents.openDevTools();
    // 3. 加载一个页面
    win.loadFile("./index.html");
}

// 2. 监听生命周期
app.on('ready', () => {
    // 执行相关逻辑
    createWindow();
});

app.on('activate', () => {
    console.log('Electron 被激活了');
});