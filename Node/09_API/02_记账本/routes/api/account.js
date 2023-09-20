var express = require('express');
var router = express.Router();
//导入moment
const moment = require('moment')
//导入AccountModel
const AccountModel = require('../../modules/AccountModel')

// 记账本的列表
router.get('/account', function(req, res, next) {
  //获取所有账单信息
  AccountModel.find().sort({time:-1}).exec((err,data)=>{
    if(err){
      //设置响应失败
      res.json({
        code:'1001',
        msg:'响应失败~~~',
        data:null
      })
      return
    }
    //设置响应成功
    res.json({
      //响应编号
      code:'0000',
      //响应信息
      msg:'响应成功',
      //响应数据
      data:data
    })
  })
});

//新增记录
router.post('/account',function(req,res){
  //插入数据库
  AccountModel.create({
    ...req.body,
    //修改 time 属性的值
    time:moment(req.body.time).toDate()
  },(err,data)=>{
    //表单验证（细致）
    
    // 失败提醒
    if(err){
      res.json({
        code:'1002',
        msg:'添加失败',
        data:null
      })
      return
    }
    //成功提示
    res.json({
      code:'0000',
      msg:'插入成功',
      data:data
    })
  })
})

//删除记录
router.get('/account/:id',(req,res)=>{
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
