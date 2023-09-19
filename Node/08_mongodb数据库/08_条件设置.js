//1. 安装 mongoose
//2. 导入 mongoose
const mongoose = require('mongoose');

//设置 strictQuery 为 true
mongoose.set('strictQuery', true);

//3. 连接 mongodb 服务                        数据库的名称
mongoose.connect('mongodb://127.0.0.1:27017/bilibili');

//4. 设置回调
// 设置连接成功的回调  once 一次   事件回调函数只执行一次
mongoose.connection.once('open', () => {
  //5. 创建文档的结构对象
  //设置集合中文档的属性以及属性值的类型
  let BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    is_hot: Boolean
  });

  //6. 创建模型对象  对文档操作的封装对象
  let BookModel = mongoose.model('novel', BookSchema);

  //价格小于20的图书
//   BookModel.find({price:{$lt:20}},(err,data)=>{
//     if(err){
//         console.log('查询失败');
//         return
//     }
//     //输出 data
//     console.log(data);
//   })

  //余华 or 曹雪芹
//   BookModel.find({$or:[{author:'曹雪芹'},{author:'余华'}]},(err,data)=>{
//     if(err){
//         console.log('查询失败');
//         return
//     }
//     //输出 data
//     console.log(data);
//   })

  //价格大于30小于70
//   BookModel.find({$and:[{price:{$gt:30}},{price:{$lt:70}}]},(err,data)=>{
//     if(err){
//         console.log('查询失败');
//         return
//     }
//     //输出 data
//     console.log(data);
//   })

  //正则表达式 搜索书名中带有 `三` 的书籍
//   BookModel.find({name:/三/},(err,data)=>{
//     if(err){
//         console.log('查询失败');
//         return
//     }
//     //输出 data
//     console.log(data);
//   })

  BookModel.find({name: new RegExp('三')},(err,data)=>{
    if(err){
        console.log('查询失败');
        return
    }
    //输出 data
    console.log(data);
  })
})

// 设置连接错误的回调
mongoose.connection.on('error', () => {
  console.log('连接失败');
});

//设置连接关闭的回调
mongoose.connection.on('close', () => {
  console.log('连接关闭');
});