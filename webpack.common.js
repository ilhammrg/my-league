const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(jpg|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/icons',
                            publicPath: 'assets/icons'
                        }
                    }
                ],
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new copyWebpackPlugin({
                patterns: [
                    { from: 'src/assets/icons', to: 'assets/icons' },
                    { from: 'src/manifest.json', to: 'manifest.json' },
                    { from: 'src/sw.js', to: 'sw.js'}
                ]
        })
    ],
    devtool: 'inline-source-map'
}