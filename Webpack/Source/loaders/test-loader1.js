/* 
    loader就是一个函数
    当webpack解析资源时，会调用相应的loader取处理
    loader接受到文件内容作为参数，返回内容出去
        content 文件内容
        map SourceMap
        meta 别的loader传递的数据
*/

// 同步loader

// 第一种
// module.exports = function(content,map,meta){
//     console.log(content);
//     return content
// }

// 第二种
module.exports = function (content, map, meta) {
    /* 
        第一个参数: err 代表是否有错误
        第二个参数: content 处理后的内容
        第三个参数: source-map 继续传递source-map
        第四个参数: meta 给下一个loader传递参数
        同步loader中不能执行异步操作
    */
    console.log("test1");
    this.callback(null, content, map, meta);
};