//1. 引入express
const express = require('express');

//2. 创建应用对象
const app = express();

//3. 创建路由规则
// request 是对请求报文的封装
// response 是对响应报文的封装
app.get('/server', (request, response) => {
    //设置响应头    设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    //设置响应体
    response.send('HELLO AJAX GET');
});

app.all('/server', (request, response) => {
    //设置响应头    设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    //响应头
    response.setHeader('Access-Control-Allow-Headers', '*');
    //设置响应体
    response.send('HELLO AJAX POST');
});

app.all('/json-server', (request, response) => {
    //设置响应头    设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    //响应头
    response.setHeader('Access-Control-Allow-Headers', '*');
    //响应一个数据
    const data = {
        name: 'atguigu'
    };
    // 对对象进行字符串转换
    let str = JSON.stringify(data);
    //设置响应体
    response.send(str);
});

//针对ie
app.get('/ie', (request, response) => {
    //设置响应头    设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    //设置响应体
    response.send('HELLO IE');
});

//延时响应
app.get('/delay', (request, response) => {
    //设置响应头    设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    setTimeout(() => {
        //设置响应体
        response.send('延时响应');
    }, 3000);
});

//jQuery服务
app.all('/jQuery-server', (request, response) => {
    //设置响应头    设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    //响应头
    response.setHeader('Access-Control-Allow-Headers', '*');
    //设置响应体
    // response.send('jQuery and AJAX');
    const data = { name: '尚硅谷' };
    response.send(JSON.stringify(data));
});

//axios服务
app.all('/axios-server', (request, response) => {
    //设置响应头    设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    //响应头
    response.setHeader('Access-Control-Allow-Headers', '*');
    //设置响应体
    const data = { name: '尚硅谷' };
    response.send(JSON.stringify(data));
});

//fetch服务
app.all('/fetch-server', (request, response) => {
    //设置响应头    设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    //响应头
    response.setHeader('Access-Control-Allow-Headers', '*');
    //设置响应体
    const data = { name: '尚硅谷' };
    response.send(JSON.stringify(data));
});

//jsonp服务
app.all('/jsonp-server', (request, response) => {
    const data = { name: '尚硅谷' };
    let str = JSON.stringify(data)
    response.end(`handle(${str})`)  /* 通过服务端响应JS代码 */
});

//username服务
app.all('/check-username', (request, response) => {
    const data = {
        exist:1,
        msg:'用户名已存在'
    };
    let str = JSON.stringify(data)
    response.end(`handle(${str})`)  /* 通过服务端响应JS代码 */
});

//jquery-jsonp-server服务
app.all('/jquery-jsonp-server', (request, response) => {
    const data = {
        name:'尚硅谷',
        address:['北京','深圳','上海']
    };
    let str = JSON.stringify(data)
    //接收callback参数
    const cb = request.query.callback
    response.end(`${cb}(${str})`)  /* 通过服务端响应JS代码 */
});

//cors服务
app.all('/cors-server',(req,res)=>{
    //设置请求头
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers','*')
    res.setHeader('Access-Control-Allow-Method','*')
    // res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:5000')
    res.send('hello cors')
})

//4. 监听端口启动服务
app.listen(8000, () => {
    console.log("服务已经启动, 8000 端口监听中....");
});