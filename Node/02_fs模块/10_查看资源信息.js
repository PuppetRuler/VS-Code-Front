//1.导入fs模块
const fs = require('fs');

//2. stat 方法 status 缩写 状态
fs.stat('../资源/伊雷娜 (1).png',(err,data)=>{
    if(err){
        console.log('操作失败');
        return
    }
    // console.log(data);
    //isFile
    // console.log(data.isFile());
    //isDirectory
    console.log(data.isDirectory());
})