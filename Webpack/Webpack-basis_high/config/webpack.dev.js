const os = require("os");
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const threads = os.cpus().length; // cpu核数

module.exports = {
    // 入口
    entry: './src/main.js',  // 相对路径
    // 输出
    output: {
        // 所有文件的输出路径
        path: undefined,
        // 入口文件打包文件名
        filename: 'static/js/[name].js',
        // 给打包输出的其他文件命名
        chunkFilename:"static/js/[name].chunk.js",
        // 图片、字体等通过type:asset处理资源命名方式
        assetModuleFilename:"static/media/[hash:6][ext][query]",
        // 自动清空上次打包的内容
        // 原理:在打包时，将path整个目录清空，再进行打包
        clean: true,
    },
    // 加载器
    module: {
        rules: [
            // loaders的配置
            {
                // 每个文件只能被其中一个loader配置处理
                oneOf: [
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
                        // generator: {
                        //     // 将图片文件输出到 static/imgs 目录中
                        //     // 将图片文件命名 [hash:8][ext][query]
                        //     // [hash:8]: hash值取8位
                        //     // [ext]: 使用之前的文件扩展名
                        //     // [query]: 添加之前的query参数
                        //     filename: 'static/images/[hash:6][ext][query]'
                        // }
                    },
                    {
                        test: /\.(ttf|woff2?|map3|map4|avi)$/,
                        type: 'asset/resource',
                        // generator: {
                        //     // 输出名称
                        //     filename: 'static/media/[hash:6][ext][query]'
                        // }
                    },
                    {
                        test: /\.js$/,
                        // exclude: /node_modules/,  // 排除node_modules中的js文件(这些文件不处理)
                        include:path.resolve(__dirname,'../src'),  // 只处理src下的文件，其他文件不处理
                        use: [
                            {
                                loader: "thread-loader", // 开启多进程
                                options: {
                                    works: threads, // 进程数量
                                }
                            },
                            {
                                loader: "babel-loader",
                                options: {
                                    // presets: ["@babel/preset-env"]
                                    cacheDirectory: true, // 开启babel缓存
                                    cacheCompression: false, //关闭缓存压缩
                                    plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                                }
                            }
                        ],
                    },
                ]
            }
        ]
    },
    // 插件
    plugins: [
        // plugin的配置
        new ESLintPlugin({
            // 检测哪些文件
            context: path.resolve(__dirname, '../src'),
            exclude:"node_modules",  //默认值
            cache: true, //开启缓存
            cacheLocation: path.resolve(__dirname, '../node_modules/.cache/.eslintcache'),
            threads, // 开启多进程和设置进程数量
        }),
        new HtmlWebpackPlugin({
            // 模板:以public/index.html文件创建新的html文件
            // 新的html文件特点:1.结构与原来一致 2.自动引入打包输出的文件
            template: path.resolve(__dirname, '../public/index.html')
        }),
    ],
    // 开发服务器:不会输出打包资源，在内存里面编译
    devServer: {
        host: "localhost", // 启动服务器域名
        port: "3000", // 启动服务器端口号
        open: false, // 是否自动打开浏览器
        hot: true //开启HMR(默认值)
    },
    // 模式
    mode: 'development',
    devtool: "cheap-module-source-map",
};