const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const manifestPlugin = require('webpack-manifest-plugin');

module.exports = {
    entry: {
        sw: "./src/assets/services/sw.js",
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
                        "src": "assets/icons/icon-72x72.png",
                        "sizes": "72x72",
                        "type": "image/png"
                    },
                    {
                        "src": "assets/icons/icon-96x96.png",
                        "sizes": "96x96",
                        "type": "image/png"
                    },
                    {
                        "src": "assets/icons/icon-128x128.png",
                        "sizes": "128x128",
                        "type": "image/png"
                    },
                    {
                        "src": "assets/icons/icon-144x144.png",
                        "sizes": "144x144",
                        "type": "image/png"
                    },
                    {
                        "src": "assets/icons/icon-152x152.png",
                        "sizes": "152x152",
                        "type": "image/png"
                    },
                    {
                        "src": "assets/icons/icon-192x192.png",
                        "sizes": "192x192",
                        "type": "image/png"
                    },
                    {
                        "src": "assets/icons/icon-384x384.png",
                        "sizes": "384x384",
                        "type": "image/png"
                    },
                    {
                        "src": "assets/icons/icon-512x512.png",
                        "sizes": "512x512",
                        "type": "image/png"
                    }
                ]
                }
            })
        ]
}