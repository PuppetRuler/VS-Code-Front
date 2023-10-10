import { sum } from './math';
// import count from './count';

console.log('hello main');
console.log(sum(1, 2, 3, 4, 5));

document.getElementById('btn').addEventListener('click', () => {
    // import动态导入：会将动态导入的代码分割（拆分成单独模块），在需要使用的时候自动加载
    import("./count")
        .then((res) => {
            console.log("模块加载成功",res.default(2,1));
        })
        .catch((err) => {
            console.log("模块加载失败",err);
        })
});