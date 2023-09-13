/* 
    创建一个HTTP服务，端口为9000，满足如下需求
    GET /index.html         响应    page/index.html的文件内容
    GET /css/app.css        响应    page/css/app.css的文件内容
    GET /image/logo.png     响应    page/images/logo.png的文件内容
*/
//1.导入 http 模块
const http = require('http');
//导入fs模块
const fs = require('fs');
//导入path模块
const path = require('path');
//定义一个变量
const mimes = {
    html: 'text/html',
    css: 'text/css',
    js: 'text/javascript',
    png: 'image/png',
    jpg: 'image/jpeg',
    gif: 'image/gif',
    mp4: 'video/mp4',
    mp3: 'audio/mpeg',
    json: 'application/json'
};

//2.创建服务对象
const server = http.createServer((request, response) => {
    //对请求方式做限制
    if(request.method !== 'GET'){
        response.statusCode = 405
        response.end('<h1>405 Method Not Allowed</h1>')

        return
    }
    //获取请求URL的路径
    let { pathname } = new URL(request.url, 'http://127.0.0.1');
    //声明一个变量
    let root = __dirname + '/page';
    //拼接文件地址
    let filePath = root + pathname;
    //读取文件 fs 异步API
    fs.readFile(filePath, (err, data) => {
        if (err) {
            //设置字符集
            response.setHeader('content-type','text/html;charset=utf-8')
            //判断错误的代号
            switch(err.code){
                case 'ENOENT':
                    response.statusCode = 404
                    response.end('<h1>404 Not Found</h1>')
                case 'EPERM':
                    response.statusCode = 403
                    response.end('<h1>403 Forbidden</h1>')
                default:
                    response.statusCode = 500
                    response.end(<h1>Internal Server Error</h1>)
            }

            return
        }
        //获取文件的后缀名
        let ext = path.extname(filePath).slice(1);
        //获取后缀名对应的类型
        let type = mimes[ext]
        if(type){
            //匹配到
            if(ext==='html'){
                response.setHeader('content-type',type+';charset=utf-8')
            }else{
                response.setHeader('content-type',type)
            }
        }else{
            //没有匹配到
            response.setHeader('content-type','application/octet-stream')
        }
        //响应文件内容
        response.end(data);
    });
});

//3.监听端口，启动服务
server.listen(9000, () => {
    console.log('服务已经启动...');
});