//导入lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

//创建db对象
const adapter = new FileSync('db.json')
const db = low(adapter)

//初始化数据
// db.defaults({ posts: [], user: {} }).write()

//添加数据
// db.get('posts').push({ id: 1, title: '我在学习lowdb'}).write()
// db.get('posts').unshift({ id: 2, title: '用unshift'}).write()

//获取数据
// console.log(db.get('posts').value());

//删除数据
// let res = db.get('posts').remove({id:2}).write()
// console.log(res);

//更新数据
// db.get('posts').find({id:1}).assign({title:'今天天气很好'}).write()