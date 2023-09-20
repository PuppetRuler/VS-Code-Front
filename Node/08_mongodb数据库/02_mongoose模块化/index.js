//导入db文件
const db = require('./db/db')
//导入mongoose
const mongoose = require('mongoose')
//导入BookModel
const BookModel = require('./modules/BookModule')

//调用函数
db(()=>{
    //增加数据
    BookModel.create({
        name:'西游记',
        author:'吴承恩',
        price:19.9
    },(err,data)=>{
        if(err){
            console.log('增加成功');
            return
        }
        console.log(data);
        mongoose.disconnect()
    })
},()=>{
    console.log('连接失败');
})