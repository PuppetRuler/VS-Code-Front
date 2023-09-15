/* 
    记录每一个请求的url和ip地址
*/
//导入express
const express = require('express')
const path = require('path')
const fs = require('fs')

//创建应用对象
const app = express()

//声明中间件函数
function recordMiddleware(req,res,next){
    //获取请求url和ip地址
    const {url,ip} = req
    //将url和ip地址保存到文件中 access.log
    fs.appendFileSync(path.resolve(__dirname,'./access.log'),`url:${url} ip:${ip}\r\n`)
    //调用next
    next()
}

//使用中间件函数
app.use(recordMiddleware)

//创建路由
app.get('/home',(req,res)=>{
    res.send('前台首页')
})

app.get('/admin',(req,res)=>{
    res.send('后台首页')
})

app.get('*',(req,res)=>{
    res.send('<h1>404 Not Found</h1>')
})

//监听端口，启动服务
app.listen(3000,()=>{
    console.log('服务已经启动，端口3000正在监听中...');
})