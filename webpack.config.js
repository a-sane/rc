var path = require('path')
var webpack = require('webpack')
var NpmInstallPlugin = require('npm-install-webpack-plugin');

module.exports = {
    //devtool: 'source-map',
    devtool: 'eval-cheap-module-source-map',
    entry: [
        'babel-polyfill',
        './web/client/src/index'
    ],
    output: {
        path: path.join(__dirname, 'web/js'),
        filename: 'bundle.js',
        publicPath: '/web/js/',
        // quiet: true,
        // historyApiFallback: true
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new NpmInstallPlugin(),
    ],
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                loaders: ['babel-loader'],
                include: [
                    path.resolve(__dirname, 'web/client/src'),
                ],
                test: /\.js$/,
                plugins: ['transform-runtime'],
            }
        ]
    }
}