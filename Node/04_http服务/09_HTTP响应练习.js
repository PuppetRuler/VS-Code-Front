//1.导入 http 模块
const http = require('http')

//2.创建服务对象
const server = http.createServer((request,respond)=>{

    respond.end(`
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>table</title>
            <style>
                td {
                    padding: 20px 40px;
                }
                table,
                tr {
                    border-collapse: collapse;
                }
                table tr:nth-child(odd){
                    background-color:#aef
                }
                table tr:nth-child(even){
                    background-color:#fcb
                }
            </style>
        </head>
        <body>
            <table border="1">
                <tr><td></td><td></td><td></td></tr>
                <tr><td></td><td></td><td></td></tr>
                <tr><td></td><td></td><td></td></tr>
                <tr><td></td><td></td><td></td></tr>
            </table>
            <script>
                //获取所有td
                tds = document.querySelectorAll('td')
                //遍历所有td
                tds.forEach(item=>{
                    item.onclick = ()=>{
                        item.style.background = '#222'
                    }
                })
            </script>
        </body>
        </html>
    `)  //设置响应体
})

//3.监听端口，启动服务
server.listen(9000,()=>{
    console.log('服务已经启动...');
})