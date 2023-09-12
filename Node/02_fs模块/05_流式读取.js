//1.引入 fs 方式模块
const fs = require('fs')

//2.创建读取流对象
const rs = fs.createReadStream('./mov_bbb.mp4')

//3.绑定data事件    chunk 块儿
rs.on('data',chunk=>{
    console.log(chunk.length);  //65536字节=>64KB
})

//4.end可选事件
rs.on('end',() => {
    console.log('读取完毕');
})