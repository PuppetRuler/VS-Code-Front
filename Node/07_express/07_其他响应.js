//导入express
const express = require('express')

//创建应用对象
const app = express()

//创建路由
app.get('/other',(req,res)=>{
    //重定向
    // res.redirect('http://www.baidu.com')
    //下载响应
    // res.download(__dirname+'/package.json')
    //JSON响应
    // res.json({
    //     name:'尚硅谷',
    //     slogin:'前端'
    // })
    //响应文件内容
    res.sendFile(__dirname+'/index.html')
})

//监听端口，启动服务
app.listen(3000,()=>{
    console.log('服务已经启动，端口3000正在监听中...');
})