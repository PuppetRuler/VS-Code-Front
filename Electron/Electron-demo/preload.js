const { contextBridge } = require('electron');

// 基本语法(为 Windows 拓展一个属性)
contextBridge.exposeInMainWorld('test', '为浏览器添加了一个属性');

contextBridge.exposeInMainWorld('ElectronAPI',{
    // 平台名称
    platform:process.platform,
    getVersions(){
        return process.versions
    }
})