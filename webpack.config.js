'use strict'
var ExtractTextPlugin = require("extract-text-webpack-plugin");  //css单独打包
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const webpack = require('webpack');
console.log(9);
module.exports = {
    devtool: 'eval-source-map',

    entry: [
        'webpack/hot/only-dev-server',//不用重启服务器就能获取最新
        './src/entry.js', //唯一入口文件
    ],
    output: {
        path: './build', //打包后的文件存放的地方
        filename: 'entry.js', //打包后输出文件的文件名
        publicPath: '/build/'  //启动本地服务后的根目录
    },

    module: {
        loaders: [
            { test: /\.js$/, loader: "jsx!babel", include: /src/},
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css!postcss")},
            { test: /\.less$/, loader: ExtractTextPlugin.extract("style", "css!postcss!less")},
            { test: /\.(png|jpg|gif)$/, loader: 'url?limit=8192'}
        ]
    },

    babel: {
        presets: ['es2015', 'stage-0', 'react'],
        plugins: ['transform-runtime', ['import', {
            libraryName: 'antd',
            style: 'css'
        }]]
    },

    postcss: [
        require('autoprefixer')    //调用autoprefixer插件,css3自动补全
    ],

    devServer: {
        // contentBase: './src/views'  //本地服务器所加载的页面所在的目录
        port: 8787,
        colors: true,  //终端中输出结果为彩色
        historyApiFallback: true,  //不跳转
        inline: true,  //实时刷新
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('comon.css'),
        new CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js'
        })
    ],
    externals: {
        "jquery": "jQuery"
    }

}