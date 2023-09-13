//导入http模块
const http = require('http')

//创建服务对象
const server = http.createServer((request,response)=>{
    //获取请求的方法
    let {method} = request
    //获取请求的路径
    let {pathname} = new URL(request.url,'http://120.0.0.1')
    response.setHeader('content-type','text/html;charset=utf-8')
    if(method==='GET' && pathname==='/login'){
        //登录情形
        response.end('登录页面')
    }else if(method==='GET' && pathname==='/reg'){
        //注册情形
        response.end('注册页面')
    }else {
        response.end('Not Found')
    }
})

//监听端口 启动服务
server.listen(9000,()=>{
    console.log('服务已经启动');
})