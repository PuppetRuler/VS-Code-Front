//1.导入 http 模块
const http = require('http')
//导入fs模块
const fs = require('fs')

//2.创建服务对象
const server = http.createServer((request,respond)=>{
    //获取文件内容
    let html = fs.readFileSync(__dirname+'/10_HTTP响应练习')
    
    respond.end(html)  //设置响应体
})

//3.监听端口，启动服务
server.listen(9000,()=>{
    console.log('服务已经启动...');
})