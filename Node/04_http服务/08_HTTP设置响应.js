//1.导入 http 模块
const http = require('http')

//2.创建服务对象
const server = http.createServer((request,response)=>{
    //1.设置响应状态码
    // response.statusCode = 203
    // response.statusCode = 404

    //2.响应状态描述
    // response.statusMessage = 'iloveyou'

    //3.响应头
    // response.setHeader('content-type','text/html;charset=utf-8')
    // response.setHeader('Server','Node Server')
    // response.setHeader('test',['a','b','c'])

    //4.响应体
    response.write('love')
    response.write('love')
    response.write('love')

    response.end()  //设置响应体
})

//3.监听端口，启动服务
server.listen(9000,()=>{
    console.log('服务已经启动...');
})