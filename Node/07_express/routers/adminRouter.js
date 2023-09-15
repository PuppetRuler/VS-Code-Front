//1.导入express模块
const express = require('express')

//2.创建router
const router = express.Router()

//后台
router.get('/admin',(req,res)=>{
    res.send('后台首页')
})
//后台设置
router.get('/setting',(req,res)=>{
    res.send('后台设置')
})

//4.暴露路由规则
module.exports = router