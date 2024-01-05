const message = document.querySelector('.message')
const btn = document.querySelector('.btn')

btn.addEventListener('click',() => {
    message.innerHTML = 'Electron'
    // console.log(window.test);
    // console.log(window.ElectronAPI);
    console.log(window.ElectronAPI.getVersions());
})