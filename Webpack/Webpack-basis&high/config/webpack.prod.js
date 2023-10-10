const os = require("os");
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const terserWebpackPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const threads = os.cpus().length; // cpu核数

// 用来获取处理样式的loader
function getStyleLoader(pre) {
    return [
        // 执行顺序,从右到左（从下到上）
        MiniCssExtractPlugin.loader,  // 提取css成单独文件
        'css-loader',  // 将css资源编译成commonjs的模块到js中
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env", // 能解决大多数样式兼容性问题
                    ],
                },
            },
        }, pre
    ].filter(Boolean);
}

module.exports = {
    // 入口
    entry: './src/main.js',
    // 输出
    output: {
        // 所有文件的输出路径
        path: path.resolve(__dirname, '../dist'),
        // 入口文件打包文件名
        filename: 'static/js/[name].[contenthash:6].js',
        // 给打包输出的其他文件命名
        chunkFilename:"static/js/[name].chunk.[contenthash:6].js",
        // 图片、字体等通过type:asset处理资源命名方式s
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
                oneOf: [
                    {
                        test: /\.css$/,  //只检测.css文件
                        use: getStyleLoader(),
                    },
                    {
                        test: /\.less$/,
                        // loader:'XXX',  // 只能使用1个loader
                        use: getStyleLoader('less-loader'),
                    },
                    {
                        test: /\.s[ac]ss$/,
                        use: getStyleLoader('sass-loader'),
                    },
                    {
                        test: /\.styl$/,
                        use: getStyleLoader('stylus-loader'),
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
                        include: path.resolve(__dirname, '../src'),  // 只处理src下的文件，其他文件不处理
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
            exclude: "node_modules",
            cache: true, //开启缓存
            cacheLocation: path.resolve(__dirname, '../node_modules/.cache/.eslintcache'),
            threads, // 开启多进程和设置进程数量
        }),
        new HtmlWebpackPlugin({
            // 模板:以public/index.html文件创建新的html文件
            // 新的html文件特点:1.结构与原来一致 2.自动引入打包输出的文件
            template: path.resolve(__dirname, '../public/index.html')
        }),
        // 将js内的css代码提取出来
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:6].css',
            chunkFilename:"static/css/[name].[contenthash:6].chunk.css",
        }),
        // new CssMinimizerPlugin(),
        // new terserWebpackPlugin({
        //     parallel: threads, // 开启多进程和设置进程数量
        // }),
        new WorkboxPlugin.GenerateSW({
            // 这些选项帮助快速启用 ServiceWorkers
            // 不允许遗留任何“旧的” ServiceWorkers
            clientsClaim: true,
            skipWaiting: true,
          }),
    ],
    optimization: {
        // 压缩的操作
        minimizer: [
            // 压缩css
            new CssMinimizerPlugin(),
            // 压缩js
            new terserWebpackPlugin({
                parallel: threads, // 开启多进程和设置进程数量
            }),
            // 压缩图片
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminGenerate,
                    options: {
                        plugins: [
                            ["gifsicle", { interlaced: true }],
                            ["jpegtran", { progressive: true }],
                            ["optipng", { optimizationLevel: 5 }],
                            [
                                "svgo",
                                {
                                    plugins: [
                                        "preset-default",
                                        "prefixIds",
                                        {
                                            name: "sortAttrs",
                                            params: {
                                                xmlnsOrder: "alphabetical",
                                            },
                                        },
                                    ],
                                },
                            ],
                        ],
                    },
                },
            }),
            // PWA离线技术
            new PreloadWebpackPlugin({
                // rel: 'preload',
                // as: 'script',
                rel:'prefetch'
            }),
        ],
        // 配置代码分割
        splitChunks:{
            chunks: "all", // 对所有模块都进行分割
            // 其他使用默认选项
        },
        // 避免b文件未使用代码发生变化导致其他文件hash值被改变,导致需要重新加载
        runtimeChunk: {
            name:(entrypoint) => `runtime~${entrypoint.name}.js`
        }
    },
    // 模式
    mode: 'production',
    devtool: "source-map",
};