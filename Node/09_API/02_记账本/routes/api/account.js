var express = require('express');
var router = express.Router();
//导入moment
const moment = require('moment');
//导入AccountModel
const AccountModel = require('../../modules/AccountModel');

// 记账本的列表
router.get('/account', function (req, res, next) {
  //获取所有账单信息
  AccountModel.find().sort({ time: -1 }).exec((err, data) => {
    if (err) {
      //设置响应失败
      res.json({
        code: '1001',
        msg: '响应失败~~~',
        data: null
      });
      return;
    }
    //设置响应成功
    res.json({
      //响应编号
      code: '0000',
      //响应信息
      msg: '响应成功',
      //响应数据
      data: data
    });
  });
});

//新增记录
router.post('/account', function (req, res) {
  //插入数据库
  AccountModel.create({
    ...req.body,
    //修改 time 属性的值
    time: moment(req.body.time).toDate()
  }, (err, data) => {
    //表单验证（细致）

    // 失败提醒
    if (err) {
      res.json({
        code: '1002',
        msg: '添加失败',
        data: null
      });
      return;
    }
    //成功提示
    res.json({
      code: '0000',
      msg: '插入成功',
      data: data
    });
  });
});

//删除记录
router.delete('/account/:id', (req, res) => {
  //获取params的id参数
  let id = req.params.id;
  AccountModel.deleteOne({ _id: id }, (err, data) => {
    if (err) {
      res.json({
        code: "1003",
        msg: "删除失败",
        data: null
      });
      return;
    }
    //删除提醒
    res.json({
      code: "0000",
      msg: "删除成功",
      data: {}
    });
  });
});

//获取单个账单内容
router.get('/account/:id', (req, res) => {
  //获取id参数
  let { id } = req.params;

  //获取对应账单
  AccountModel.find({ _id: id }, (err, data) => {
    //失败提醒
    if (err) {
      return res.json({
        code: "1004",
        msg: "获取失败",
        data: null
      });
    }
    //成功提醒
    res.json({
      code: "0000",
      msg: "获取成功",
      data: data
    });
  });
});

//更新账单
router.patch('/account/:id', (req, res) => {
  //获取id
  let { id } = req.params;
  //更新账单
  AccountModel.updateOne({ _id: id }, req.body, (err, data) => {
    //失败提醒
    if (err) {
      return res.json({
        code: "1005",
        msg: "更新失败",
        data: null
      });
    }
    //更新成功
    AccountModel.findById({ _id: id }, (err, data) => {
      if (err) {
        return res.json({
          code: "1004",
          msg: "读取失败",
          data: data
        });
      }
      //成功提醒
      res.json({
        code: "0000",
        msg: "更新成功",
        data: data
      });
    });
  });
});

module.exports = router;
