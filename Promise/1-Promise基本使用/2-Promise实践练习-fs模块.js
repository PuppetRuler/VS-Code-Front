const fs = require('fs');

//回调函数处理
// fs.readFile('./resources/demo.txt',(err,data)=>{
//   //如果出错，抛出错误
//   if(err) throw err
//   console.log(data);
// })

//Promise
const p = new Promise((resolve, reject) => {
    fs.readFile('./resources/demo.txt', (err, data) => {
        if (err) reject(err);
        resolve(data);

    });
});

//调用 then 方法
p.then((value) => {
    console.log(value.toString());
}, (reason) => {
    console.log(reason);
});