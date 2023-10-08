const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 入口
    entry: './src/main.js',
    // 输出
    output: {
        // 所有文件的输出路径
        path: path.resolve(__dirname, '../dist'),
        // 入口文件打包文件名
        filename: 'static/js/main.js',
        // 自动清空上次打包的内容
        // 原理:在打包时，将path整个目录清空，再进行打包
        clean: true,
    },
    // 加载器
    module: {
        rules: [
            // loaders的配置
            {
                test: /\.css$/,  //只检测.css文件
                use: [
                    // 执行顺序,从左到右（从上到下）
                    "style-loader",   // 将js中css通过创建style标签添加html文件中生效
                    "css-loader"  // 将css资源编译成commonjs的模块到js中
                ],
            },
            {
                test: /\.less$/,
                // loader:'XXX',  // 只能使用1个loader
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',  // 将less编译成css文件
                ],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    // 将 JS 字符串生成为 style 节点
                    'style-loader',
                    // 将 CSS 转化成 CommonJS 模块
                    'css-loader',
                    // 将 Sass 编译成 CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.styl$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader',  // 将stylus编译成css文件
                ],
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        // 小于10kb的图片转base64
                        // 优点:减少请求数量    缺点:体积会增大
                        maxSize: 10 * 1024  //10kb
                    }
                },
                generator: {
                    // 将图片文件输出到 static/imgs 目录中
                    // 将图片文件命名 [hash:8][ext][query]
                    // [hash:8]: hash值取8位
                    // [ext]: 使用之前的文件扩展名
                    // [query]: 添加之前的query参数
                    filename: 'static/images/[hash:6][ext][query]'
                }
            },
            {
                test: /\.(ttf|woff2?|map3|map4|avi)$/,
                type: 'asset/resource',
                generator: {
                    // 输出名称
                    filename: 'static/media/[hash:6][ext][query]'
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,  // 排除node_modules中的js文件(这些文件不处理)
                use: {
                    loader: 'babel-loader',
                    //   options: {
                    //     presets: ['@babel/preset-env']
                    //   }
                }
            },
        ]
    },
    // 插件
    plugins: [
        // plugin的配置
        new ESLintPlugin({
            // 检测哪些文件
            context: path.resolve(__dirname, '../src'),
        }),
        new HtmlWebpackPlugin({
            // 模板:以public/index.html文件创建新的html文件
            // 新的html文件特点:1.结构与原来一致 2.自动引入打包输出的文件
            template: path.resolve(__dirname, '../public/index.html')
        }),
    ],
    // 模式
    mode: 'production'
};