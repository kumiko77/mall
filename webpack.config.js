const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')

//配置环境变量
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

const getHtmlConfig = name => {
    return ({
        template: './src/view/' + name + '.html',
        filename: './view/' + name + '.html',
        hash: true,
        inject: true,
        chunks: ['common', name]
    });
};

module.exports = {
    entry: {
        'index': './src/page/index/index.js',
        'login': './src/page/login/login.js',
        'common': ['./src/page/common/index.js',
            'webpack-dev-server/client?http://localhost:8080'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist', 
        filename: 'js/[name].js'
    },
    module: {
        loaders: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js',
            chunks: ['manifest', 'vendor', 'app']
        }),
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))
    ]
}