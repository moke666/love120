const path = require('path');
const HtmlWebpackPlugin= require('html-webpack-plugin');
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
                loader: 'compile-nunjucks-loader'
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    },

    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./views/index.njk'
        }),
        new HtmlWebpackPlugin({
            filename:'team.html',
            template:'./views/team.njk'
        })
    ]
}