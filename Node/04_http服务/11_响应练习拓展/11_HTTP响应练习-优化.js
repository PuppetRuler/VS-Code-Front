//1.导入 http 模块
const http = require('http')
//导入fs模块
const fs = require('fs')

//2.创建服务对象
const server = http.createServer((request,response)=>{
    //获取请求URL的路径
    let {pathname} = new URL(request.url,'http://127.0.0.1')
    if(pathname === '/'){
    //获取文件内容
    let html = fs.readFileSync(__dirname+'/11_HTTP响应练习.html')
    response.end(html)  //设置响应体
    }else if (pathname === '/index.css') {
        let css = fs.readFileSync(__dirname+'/index.css')
        response.end(css)
    }else if (pathname === '/index.js') {
        let js = fs.readFileSync(__dirname+'/index.js')
        response.end(js)
    }else {
        response.statusCode = 404
        response.end('<h1>404 Not Found</h1>')
    }
})

//3.监听端口，启动服务
server.listen(9000,()=>{
    console.log('服务已经启动...');
})