const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const manifestPlugin = require('webpack-manifest-plugin');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js"
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
        new manifestPlugin({
            fileName: "manifest.json",
            seed: {
                "name": "My League",
                "short_name": "My League",
                "theme_color": "#37003c",
                "background_color": "#37003c",
                "display": "standalone",
                "scope": "/",
                "orientation": "portrait",
                "start_url": "/index.html",
                "icons": [
                {
                    "src": "",
                    "sizes": "72x72",
                    "type": "image/png"
                },
                {
                    "src": "",
                    "sizes": "96x96",
                    "type": "image/png"
                },
                {
                    "src": "",
                    "sizes": "128x128",
                    "type": "image/png"
                },
                {
                    "src": "",
                    "sizes": "144x144",
                    "type": "image/png"
                },
                {
                    "src": "",
                    "sizes": "152x152",
                    "type": "image/png"
                },
                {
                    "src": "",
                    "sizes": "192x192",
                    "type": "image/png"
                },
                {
                    "src": "",
                    "sizes": "384x384",
                    "type": "image/png"
                },
                {
                    "src": "",
                    "sizes": "512x512",
                    "type": "image/png"
                }
                ]
                        }
                    })
                ]
}