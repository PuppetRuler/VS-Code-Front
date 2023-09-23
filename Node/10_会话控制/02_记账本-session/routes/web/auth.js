var express = require('express');
var router = express.Router();
//导入用户模型
const UserModel = require('../../modules/UserModel')
const md5 = require('md5')

//注册页面
router.get('/reg',(req,res)=>{
    //响应HTML内容
    res.render('auth/reg')
})

//注册操作
router.post('/reg',(req,res)=>{
    //做表单验证
    //获取请求体的数据
    UserModel.create({...req.body,password:md5(req.body.password)},(err,data)=>{
        if(err){
            res.status(500).send('注册失败，请稍后重试~~')
            return
        }
        res.render('success',{msg:'注册成功',url:'/login'})
    })
})

//登录页面
router.get('/login',(req,res)=>{
    //响应HTML内容
    res.render('auth/login')
})

//登录操作
router.post('/login',(req,res)=>{
    //获取用户名和密码
    let {username,password} = req.body
    //查询数据库
    UserModel.findOne({username:username,password:md5(password)},(err,data)=>{
        if(err){
            res.status(500).send('登录失败，请稍后重试~~')
            return
        }
        //判断 data
        if(!data){
            return res.send('账号或密码错误~~')
        }
        //写入session
        req.session.username = data.username
        req.session._id = data._id

        res.render('success',{msg:'登录成功',url:'/account'})
    })
})

//退出登录
router.post('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.render('success',{msg:'退出成功',url:'/login'})
    })
})

module.exports = router;
