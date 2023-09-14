//导入express
const express = require('express')

//创建应用对象
const app = express()

//创建路由
app.get('/home',(req,res)=>{
    res.end('hello express')
})
// get
app.get('/',(req,res)=>{
    res.end('home')
})
// post
app.post('/login',(req,res)=>{
    res.end('This is a login page')
})
//响应所有方法
app.all('/test',(req,res)=>{
    res.end('test all method')
})
//404响应
app.get('*',(req,res)=>{
    res.end('404 Not Found')
})

//监听端口，启动服务
app.listen(3000,()=>{
    console.log('服务已经启动，端口3000正在监听中...');
})