//导入express
const express = require('express')
//2. 引入 express-session connect-mongo
const session = require("express-session");
const MongoStore = require('connect-mongo');

//创建应用对象
const app = express()
//3. 设置 session 的中间件
app.use(session({
    name: 'sid', //设置cookie的name，默认值是：connect.sid
    secret: 'atguigu', //参与加密的字符串（又称签名）
    saveUninitialized: false, //是否为每次请求都设置一个cookie用来存储session的id
    resave: true, //是否在每次请求时重新保存session
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/bilibili' //数据库的连接配置
    }),
    cookie: {
        httpOnly: true, // 开启后前端无法通过 JS 操作
        maxAge: 1000 * 300*5 // 这一条 是控制 sessionID 的过期时间的！！！
    },
}))

//创建路由规则
app.get('/',(req,res)=>{
    res.send('启动成功')
})

//登录  session 的设置
app.get('/login',(req,res)=>{
    if(req.query.username==='admin' && req.query.password === 'admin'){
        //设置 session 信息
        req.session.username = "admin"
        req.session.uid = "272nidnwn"
        //成功响应
        res.send('登录成功')
    }else{
        res.send('登录失败~~~')
    }
})

//session获取
app.get('/cart',(req,res)=>{
    //检测 session 是否存有用户数据
    if(req.session.username){
        res.send(`购物者页面，欢迎${req.session.username}`)
    }else{
        res.send('你还没有登录')
    }
})

app.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.send('退出成功')
    })
})

//启动服务
app.listen(3000)