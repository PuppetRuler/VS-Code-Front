const express = require('express');
const router = express.Router();
//导入jwt
const jwt = require('jsonwebtoken')
//导入用户模型
const UserModel = require('../../modules/UserModel')
const md5 = require('md5')
//导入secret
const {secret} = require('../../config/config')

//登录操作
router.post('/login',(req,res)=>{
    //获取用户名和密码
    let {username,password} = req.body
    //查询数据库
    UserModel.findOne({username:username,password:md5(password)},(err,data)=>{
        if(err){
            res.status(500).send('登录失败，请稍后重试~~')
            res.json({
                code:'2001',
                msg:'数据库读取错误',
                data:null
            })
            return
        }
        //判断 data
        if(!data){
            return res.json({
                code:'2002',
                msg:'用户名或密码错误',
                data:null
            })
        }
        //生成token
        let token = jwt.sign({
            username:data.username,
            _id:data._id
        },secret,{
            expiresIn:60*60*24*7
        })

        //响应token
        res.json({
            code:'0000',
            msg:'登录成功',
            data:token
        })
    })
})

//退出登录
router.post('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.render('success',{msg:'退出成功',url:'/login'})
    })
})

module.exports = router;
