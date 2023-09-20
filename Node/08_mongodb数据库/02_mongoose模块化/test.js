//导入 db
const db = require('./db/db')
//导入MovieModel
const MovieModel = require('./modules/MovieModel')
//调用函数
db(()=>{
    MovieModel.create({title:'让子弹飞',director:'姜文'},(err,data)=>{
        if(err){
            console.log('插入失败');
            return
        }
        console.log(data);
    })
})