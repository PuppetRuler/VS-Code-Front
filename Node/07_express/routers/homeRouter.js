//1.导入express模块
const express = require('express')

//2.创建router
const router = express.Router()

//3.设置路由规则
//前台
router.get('/home',(req,res)=>{
    res.send('前台首页')
})

//搜索
router.get('/search',(req,res)=>{
    res.send('搜索页面')
})

//4.暴露路由规则
module.exports = router