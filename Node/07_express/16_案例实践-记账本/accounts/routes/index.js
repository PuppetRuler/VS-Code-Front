var express = require('express');
const { render } = require('../app');
var router = express.Router();
//导入lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(__dirname+'/../data/db.json')
//创建db对象
const db = low(adapter)
//导入id
const shortid = require('shortid')

// 记账本的列表
router.get('/account', function(req, res, next) {
  //获取所有账单信息
  let accounts = db.get('accounts').value()
  res.render('list',{accounts:accounts})
});

//添加记录
router.get('/account/create', function(req, res, next) {
  res.render('create')
});

//新增记录
router.post('/account',function(req,res){
  //获取id
  id = shortid.generate()
  //写入文件
  db.get('accounts').unshift({id,...req.body}).write()
  res.render('success',{msg:'添加成功了,Ciallo～(∠・ω< )',url:'/account'})
})

//删除记录
router.get('/account/:id',(req,res)=>{
  //获取params的id参数
  let id = req.params.id
  db.get('accounts').remove({id:id}).write()
  //删除提醒
  res.render('success',{msg:'删除成功',url:'/account'})
})

module.exports = router;
