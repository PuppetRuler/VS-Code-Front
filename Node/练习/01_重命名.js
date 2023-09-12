//1.导入fs模块
const fs = require('fs');

//读取文件夹
// const files = fs.readdirSync('../02_fs模块')

//遍历数组
// files.forEach(item=>{
//     //拆分文件名
//     [num,name] = item.split('_')
//     //判断
//     if(Number(num)<10) {
//         num = '0'+num
//     }
//     //创建新的文件名
//     newName = num+'_'+name
//     //重命名
//     fs.rename(`../02_fs模块/${item}`,`../02_fs模块/${newName}`)
// })