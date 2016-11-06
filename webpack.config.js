var path = require('path')
var webpack = require('webpack')
var NpmInstallPlugin = require('npm-install-webpack-plugin');
// var Dashboard = require('webpack-dashboard');
// var DashboardPlugin = require('webpack-dashboard/plugin');
// var dashboard = new Dashboard();

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
        // new DashboardPlugin(dashboard.setData)
    ],
    module: { //Обновлено
        loaders: [ //добавили babel-loader
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                loaders: ['babel-loader'],
                include: [
                    path.resolve(__dirname, "web/client/src"),
                ],
                test: /\.js$/,
                plugins: ['transform-runtime'],
            }
        ]
    }
}