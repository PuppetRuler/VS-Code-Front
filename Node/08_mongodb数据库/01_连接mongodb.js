//导入 mongoose
const mongoose = require('mongoose')

//设置 strictQuery 为 true
mongoose.set('strictQuery', true);

//连接 mongodb 服务                          数据库的名称
mongoose.connect('mongodb://127.0.0.1:27017/bilibili')

//设置回调
//设置连接成功的回调  once 一次   事件回调函数只执行一次
mongoose.connection.on('open',()=>{
    console.log('连接成功');
})

//设置连接失败的错误
mongoose.connection.on('error',()=>{
    console.log('连接失败');
})

//设置连接关闭的回调
mongoose.connection.on('close',()=>{
    console.log('连接关闭');
})

//关闭mongodb的连接
// setTimeout(()=>{
//     mongoose.disconnect()
// },2000)