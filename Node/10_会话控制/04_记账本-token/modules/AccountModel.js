//导入mongoose
const mongoose = require('mongoose')

//创建结构对象
let AccountSchema = new mongoose.Schema({
    //标题
    title:{
        type:String,
        required:true
    },
    //时间
    time:Date,
    //类型
    type:{
        type:Number,
        default:-1
    },
    //价格
    account:{
        type:Number,
        required:true
    },
    //备注
    remarks:{
        type:String
    }
})

//创建模型对象
let AccountModel = mongoose.model('accounts',AccountSchema)

module.exports = AccountModel