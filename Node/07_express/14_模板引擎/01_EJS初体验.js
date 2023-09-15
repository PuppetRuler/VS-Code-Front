//导入EJS
const ejs = require('ejs')
const fs = require('fs')

//字符串
let china = '中国'
let weather = '今天天气不错'

//声明变量
let str = fs.readFileSync('./01_html.html').toString()

//使用ejs渲染
let result = ejs.render(str,{china,weather})

console.log(result);