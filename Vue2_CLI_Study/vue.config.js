const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false, /*关闭语法检查*/
    //开启代理服务器(方式一)(1.只能配置一个代理服务器 2.当public文件夹内存在请求的文件名时不会再找服务器索取数据)
    /* devServer: {
        proxy:'http://localhost:5000'
    }, */
    //开启代理服务器(方式二)
    devServer: {
        proxy: {
            '/atguigu': {
                target: 'http://localhost:5000',
                pathRewrite:{'^/atguigu':''},
                // ws: true,  //用于支持websocket
                // changeOrigin: true  //用于控制请求中的host值，此处是伪装成了请求服务器5000
            },
            '/demo': {
                target: 'http://localhost:5001',
                pathRewrite:{'^/demo':''},
                // ws: true,  //用于支持websocket
                // changeOrigin: true  //用于控制请求中的host值，此处是伪装成了请求服务器5000
            },
            /* '/foo': {
                target: '<other_url>'
            } */
        }
    }
});
