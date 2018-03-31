const path = require('path');
const HtmlWebpackPlugin= require('html-webpack-plugin');
const uglify = require('uglifyjs-webpack-plugin');
module.exports = {
    entry: {
        'index': path.resolve(__dirname, './srv/index.js')
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.njk?$/,
                loader: './plus/compile-nunjucks-loader'
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    },

    plugins: [
        //new uglify(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './views/index.njk'
        }),
        new HtmlWebpackPlugin({
            filename: 'team.html',
            template: './views/team.njk'
        }),
        new HtmlWebpackPlugin({
            filename: 'about.html',
            template: './views/about.njk'
        }),
        new HtmlWebpackPlugin({
            filename: '/fw/affair.html',
            template: './views/fw/affair.njk'
        }),
        new HtmlWebpackPlugin({
            filename: 'fw/be_pretty.html',
            template: './views/fw/be_pretty.njk'
        }),
        new HtmlWebpackPlugin({
            filename: 'fw/love.html',
            template: './views/fw/love.njk'
        }),
        new HtmlWebpackPlugin({
            filename: 'fw/marriage.html',
            template: './views/fw/marriage.njk'
        }),
        new HtmlWebpackPlugin({
            filename: 'fw/the_one.html',
            template: './views/fw/the_one.njk'
        })
    ]
}