//导入mongoose
const mongoose = require('mongoose')

//创建结构对象
let MovieSchema = new mongoose.Schema({
    title:String,
    director:String
})

//创建模型对象
let MovieModel = mongoose.model('movies',MovieSchema)

module.exports = MovieModel