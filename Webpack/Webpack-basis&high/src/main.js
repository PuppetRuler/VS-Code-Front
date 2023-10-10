// 完整引入
// import 'core-js';
// 按需引入
// import 'core-js/es/promise';
import count from "./js/count";
import sum from "./js/sum";
// 引入需要webpack打包的资源
import './css/index.css'
import './less/index.less'
import './sass/index.sass'
import './sass/index.scss'
import './stylus/index.styl'
import './css/iconfont.css'
import './js/iconfont'

console.log(count(5,2));
console.log(sum(1,2,3,4,5));

document.getElementById('btn').addEventListener('click',() => {
    // eslint不能识别的那个太导入需要，需要额外追加配置
    // /* webpackChunkName:"math" */ webpack魔法命名
    import(/* webpackChunkName:"math" */"./js/math")
        .then(({mul}) => {
            console.log(mul(2,3));
        })
        .catch((err) => {
            console.log(err);
        })
})

if(module.hot){
    // 判断是否支持热模块替换功能
    module.hot.accept("./js/count")
    module.hot.accept("./js/sum")
    module.hot.accept("./js/math")
}

new Promise((resolve) => {
    setTimeout(() => {
        resolve()
    }, 1000);
})

let array = [1,2,3,4]

console.log(array.includes(1));

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }