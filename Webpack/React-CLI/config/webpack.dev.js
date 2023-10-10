const path = require('path');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

// 返回处理样式loader
function getStylesLoader(pre) {
    return [
        "style-loader",
        "css-loader",
        {
            // 处理css兼容性问题
            // 配合package.json中browserslist来指定兼容性
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: ["postcss-preset-env"],
                },
            },
        },
        pre
    ].filter(Boolean);
}

modules.exports = {
    entry: "./src/main.js",
    output: {
        path: undefined,
        filename: "static/js/[name].js",
        chunkFilename: "static/js/[name].chunk.js",
        assetModuleFilename: "static/media/[hash:10][ext][query]",
    },
    modules: {
        rules: [
            // 处理css
            {
                test: /\.css$/,
                use: getStylesLoader()
            },
            {
                test: /\.less$/,
                use: getStylesLoader("less-loader")
            },
            {
                test: /\.s[ac]ss$/,
                use: getStylesLoader("sass-loader")
            },
            {
                test: /\.styl$/,
                use: getStylesLoader("stylus-loader")
            },
            // 处理图片
            {
                test: /\.(jpe?g|png|gif|webp|svg)/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                },
            },
            // 处理其他资源
            {
                test: /\.(jpe?g|png|gif|webp|svg)/,
                type: "asset/resource",
            },
            // 处理js
            {
                test: /\.jsx?$/,
                include: "../src",
                loader: "babel-loader",
                option: {
                    cacheDirectory: true,
                    cacheCompression: false,
                },
            },
        ],
    },
    // 处理html
    plugins: [
        new EslintWebpackPlugin({
            context: path.resolve(__dirname, '../src'),
            exclude: "node_modules",
            cache: true,
            cacheLocation: path.resolve(__dirname, '../node_modules/.cache/.eslintcache')
        }),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html")
        }),
    ],
    mode: "development",
    devtool: "cheap-module-source-map",
    optimization: {
        // 代码分割配置
        splitChunks: {
            chunks: "all",
        },
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}.js`
        },
    },
    devServer: {
        host: "localhost",
        port: 3000,
        open: false,
        hot: true
    }
};