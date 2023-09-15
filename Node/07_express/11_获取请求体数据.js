/* 
    按照要求搭建HTTP服务

    GET  /login  显示表单内容
    POST  /login  获取表单中的[用户名]和[密码]
*/
//导入
const express = require('express')
const bodyParser = require('body-parser')

//创建路由对象
const app = express()

// 解析querystring格式请求体的中间件
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// 解析JSON格式的请求体的中间件
// const jsonParser = bodyParser.json()

//设置GET路由规则
app.get('/login',(req,res)=>{
    res.send('表单页面')
})
//设置POST路由规则
app.post('/login',urlencodedParser,(req,res)=>{
    //获取用户名和密码
    console.log(req.body);
    res.send('获取用户数据')
})

//开启监视,设置端口
app.listen(3000,()=>{
    console.log('服务开启成功~');
})