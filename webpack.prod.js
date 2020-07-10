const { merge } = require('webpack-merge');
const commonJs = require('./webpack.common.js');

module.exports = merge(commonJs, {
    mode: "production"
});