const express = require('express')
const fs = require('fs')

const app = express()

app.use(express.static(__dirname+'/public'))

app.listen(3000,()=>{
    console.log('服务启动成功~~');
})