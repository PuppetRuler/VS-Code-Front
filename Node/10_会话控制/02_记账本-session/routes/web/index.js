//导入express
const express = require('express');
//导入moment
const moment = require('moment')
//导入AccountModel
const AccountModel = require('../../modules/AccountModel')
//导入中间件
const checkLoginMiddleware = require('../../middlewares/checkLoginMiddleware')
//创建路由对象
const router = express.Router();

//添加首页路由规则
router.get('/',(req,res)=>{
  res.redirect('/account')
})

// 记账本的列表
router.get('/account',checkLoginMiddleware, function(req, res, next) {
  //获取所有账单信息
  // let accounts = db.get('accounts').value()
  AccountModel.find().sort({time:-1}).exec((err,data)=>{
    if(err){
      res.status(500).send('读取失败')
      return
    }
    res.render('list',{accounts:data,moment:moment})
  })
});

//添加记录页面
router.get('/account/create',checkLoginMiddleware, function(req, res, next) {
  res.render('create')
});

//新增记录
router.post('/account',checkLoginMiddleware,function(req,res){
  //插入数据库
  AccountModel.create({
    ...req.body,
    //修改 time 属性的值
    time:moment(req.body.time).toDate()
  },(err,data)=>{
    if(err){
      res.status(500).send('插入失败')
      return
    }
    //成功提示
    res.render('success',{msg:'添加成功~~~',url:'/account'})
  })
})

//删除记录
router.get('/account/:id',checkLoginMiddleware,(req,res)=>{
  //获取params的id参数
  let id = req.params.id
  // db.get('accounts').remove({id:id}).write()
  AccountModel.deleteOne({_id:id},(err,data)=>{
    if(err){
      res.status(500).send('删除失败')
      return
    }
    //删除提醒
    res.render('success',{msg:'删除成功',url:'/account'})
  })
})

module.exports = router;
