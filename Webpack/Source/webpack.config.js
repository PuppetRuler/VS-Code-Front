const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TestPlugin = require('./plugins/test-plugin')
const BannerWebpackPlugin = require('./plugins/banner-webpack-plugin')
const ClearWebpackPlugin = require('./plugins/clear-webpack-plugin')
const AnalyzeWebpackPlugin = require('./plugins/analyze-webpack-plugin')
const InlineWebpackPlugin = require('./plugins/inline-chunk-webpack-plugin')

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "js/[name].js",
        // clean: true,
    },
    module: {
        rules: [
            /* 同步 */
            // {
            //     test:/\.js$/,
            //     loader:"./loaders/test-loader1.js"
            // },
            /* 异步 */
            // {
            //     test:/\.js$/,
            //     use:["./loaders/test-loader1","./loaders/test-loader2"]
            // },
            /* raw */
            // {
            //     test:/\.js$/,
            //     loader:"./loaders/test-loader3.js"
            // },
            /* pitch */
            // {
            //     test:/\.js$/,
            //     use:["./loaders/test-loader4.js","./loaders/test-loader5.js","./loaders/test-loader6.js"]
            // },
            /* clean console.log */
            // {
            //     test:/\.js$/,
            //     loader:"./loaders/clean-log-loader.js"
            // },
            /* 配置options并添加作者 */
            // {
            //   test: /\.js$/,
            //   loader: "./loaders/banner-loader",
            //   options: {
            //     author: "老王",
            //     // age: 18, // 不能新增字段，不然会报错
            //   },
            // },
            {
                test: /\.js$/,
                loader: "./loaders/babel-loader",
                options: {
                    presets: ["@babel/preset-env"],
                },
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: "./loaders/file-loader",
                type: "javascript/auto", // 阻止webpack默认处理图片资源，只使用file-loader处理
            },
            {
                test: /\.css$/,
                // use:["style-loader","css-loader"],
                use: [
                    './loaders/style-loader',
                    'css-loader'
                ]
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html"),
        }),
        // new TestPlugin(),
        new BannerWebpackPlugin({
            author:"Puppet Master"
        }),
        new ClearWebpackPlugin(),
        new AnalyzeWebpackPlugin(),
        new InlineWebpackPlugin([/runtime(.*)\.js$/g])
    ],
    optimization:{
        splitChunks:{
            chunks:"all",
        },
        runtimeChunk:{
            name: (entrypoint) => `runtime~${entrypoint.name}.js`
        }
    },
    mode: "production"
};