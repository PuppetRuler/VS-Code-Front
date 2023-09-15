/* 
    针对/admin/setting的请求，要求URL携带code=521参数，如未携带提示『暗号错误」
*/
//导入express
const express = require('express')
//导入路由规则
const homeRouter = require('./routers/homeRouter')
const adminRouter = require('./routers/adminRouter')

//创建应用对象
const app = express()

app.use(homeRouter)
app.use(adminRouter)

app.get('*',(req,res)=>{
    res.send('<h1>404 Not Found</h1>')
})

//监听端口，启动服务
app.listen(3000,()=>{
    console.log('服务已经启动，端口3000正在监听中...');
})