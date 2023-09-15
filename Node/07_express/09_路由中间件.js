/* 
    针对/admin/setting的请求，要求URL携带code=521参数，如未携带提示『暗号错误」
*/
//导入express
const express = require('express')

//创建应用对象
const app = express()

//创建路由
app.get('/home',(req,res)=>{
    res.send('前台首页')
})
//声明路由中间件
let checkCodeMiddleware = (req,res,next)=>{
    if(req.query.code === '521') {
        next()
    }else{
        res.send('暗号错误')
    }
}
//后台
app.get('/admin',checkCodeMiddleware,(req,res)=>{
    res.send('后台首页')
})
//后台设置
app.get('/setting',checkCodeMiddleware,(req,res)=>{
    res.send('后台设置')
})
app.get('*',(req,res)=>{
    res.send('<h1>404 Not Found</h1>')
})

//监听端口，启动服务
app.listen(3000,()=>{
    console.log('服务已经启动，端口3000正在监听中...');
})