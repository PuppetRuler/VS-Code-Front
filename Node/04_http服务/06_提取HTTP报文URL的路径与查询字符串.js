//1.导入 http 模块
const http = require('http')
//导入url模块
const url = require('url')

//创建服务对象
const server = http.createServer((request,respond)=>{
    //实例化 URL 的对象
    let url = new URL(request.url,'http://127.0.0.1:9000')
    console.log(url);
    //输出路径
    console.log(url.pathname);
    //输出 keyword 查询字符串
    console.log(url.searchParams.get('keyword'));

    respond.end('url')
})

//3.监听端口，启动服务
server.listen(9000,()=>{
    console.log('服务已经启动...');
})