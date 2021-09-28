const path = require('path');

const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, './public'),
    },
    optimization: {
        minimizer: [new CssMinimizerPlugin()]
    }
});