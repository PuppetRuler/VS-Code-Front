//导入 mongoose
const mongoose = require('mongoose')

//设置 strictQuery 为 true
mongoose.set('strictQuery', true);

//连接 mongodb 服务                          数据库的名称
mongoose.connect('mongodb://127.0.0.1:27017/bilibili')

//设置回调
//设置连接成功的回调  once 一次   事件回调函数只执行一次
mongoose.connection.once('open',()=>{
    //创建文档的结构对象
    //设置集合中文档的属性以及属性值的类型
    let BookSchema = new mongoose.Schema({
        name:String,
        auther:String,
        price:Number,
        is_hot:Boolean,
        tags:Array,
        pub_time:Date,
        // id:mongoose.Schema.Types.ObjectId  //文档ID
    })

    //创建模型对象  对文档操作的封装对象
    let BookModel = mongoose.model('books',BookSchema)

    //新增
    BookModel.create({
        name:'西游记',
        auther:'吴承恩',
        price:19.9,
        is_hot:true,
        tags:['鬼怪','励志','社会'],
        pub_time:new Date(),
    },(err,data)=>{
        //判断是否有错误
        if(err){
            console.log(err);
            return
        }

        //如果没有出错，则输出插入后的文档对象
        console.log(data);
        //关闭数据库的连接(项目运行过程中，不会添加改代码)
        mongoose.disconnect()
    })
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