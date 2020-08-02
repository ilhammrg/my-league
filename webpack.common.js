const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const brotliPlugin = require('brotli-webpack-plugin');
const pwaManifest = require('webpack-pwa-manifest');

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
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new copyWebpackPlugin({
                patterns: [
                    { from: 'src/assets/icons/icon.svg', to: 'assets/icons/icon.svg' },
                    {from: 'src/sw.js', to: 'sw.js'}
                ]
        }),
        new pwaManifest({
            fingerprints: false,
            filename: "manifest.json",
            name: "My League",
            short_name: "My League",
            gcm_sender_id: "687032362628",
            theme_color: "#424242",
            background_color: "#424242",
            display: "standalone",
            scope: "/",
            orientation: "portrait",
            start_url: "/index.html",
            icons: [
                {
                    src: path.resolve('src/assets/icons/icon-72x72.png'),
                    size: '72x72',
                    type: 'image/png',
                    purpose: 'any maskable'
                },
                {
                    src: path.resolve('src/assets/icons/icon-96x96.png'),
                    size: '96x96',
                    type: 'image/png',
                    purpose: 'any maskable'
                },
                {
                    src: path.resolve('src/assets/icons/icon-128x128.png'),
                    size: '128x128',
                    type: 'image/png',
                    purpose: 'any maskable'
                },
                {
                    src: path.resolve('src/assets/icons/icon-144x144.png'),
                    size: '144x144',
                    type: 'image/png',
                    purpose: 'any maskable'
                },
                {
                    src: path.resolve('src/assets/icons/icon-152x152.png'),
                    size: '152x152',
                    type: 'image/png',
                    purpose: 'any maskable'
                },
                {
                    src: path.resolve('src/assets/icons/icon-192x192.png'),
                    size: '192x192',
                    type: 'image/png',
                    purpose: 'any maskable'
                },
                {
                    src: path.resolve('src/assets/icons/icon-384x384.png'),
                    size: '384x384',
                    type: 'image/png',
                    purpose: 'any maskable'
                },
                {
                    src: path.resolve('src/assets/icons/icon-512x512.png'),
                    size: '512x512',
                    type: 'image/png',
                    purpose: 'any maskable'
                },
            ]
        }),
        new brotliPlugin({
            asset: '[path].br[query]',
			test: /\.(js|css|html|svg)$/,
			threshold: 10240,
			minRatio: 0.8
        })
    ]
}