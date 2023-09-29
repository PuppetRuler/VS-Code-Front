const fs = require('fs')
const util = require('util')
const mineReadFile = util.promisify(fs.readFile)

// 回调函数的方式
// fs.readFile('./resources/1.txt',(err,data1)=>{
//     if(err) throw err
//     fs.readFile('./resources/2.txt',(err,data2)=>{
//         if(err) throw err
//         fs.readFile('./resources/3.txt',(err,data3)=>{
//             if(err) throw err
//             console.log(data1+data2+data3);
//         })
//     })
// })

//async 与 await
async function main(){
    try {
        // 读取第一个文件内容
        data1 = mineReadFile('./resources/1.txt')
        data2 = mineReadFile('./resources/2.txt')
        data3 = mineReadFile('./resources/3.txt')
        console.log(data1 + data2 + data3);
    } catch (e) {
        console.log(e);
    }
}

main()