/* 
    复制文件夹下的mp4视频
*/
const fs = require('fs')
const process = require('process')
// //方式一:readFile
// //读取文件内容
// let data = fs.readFileSync('./mov_bbb.mp4')
// //写入文件
// fs.writeFileSync('./mov_bbb_copy.mp4',data)
// console.log(process.memoryUsage());  //rss  31744000字节  30MB

//方式二:流式操作
//创建读取流对象
const rs = fs.createReadStream('./mov_bbb.mp4')
//创建写入流对象
const ws = fs.createWriteStream('./mov_bbb_copy2.mp4')

//绑定 data 事件
// rs.on('data',chunk=>{
//     ws.write(chunk)
// })

// rs.on('end',() => {
//     console.log(process.memoryUsage());  //rss  32055296字节  
// })

rs.pipe(ws)