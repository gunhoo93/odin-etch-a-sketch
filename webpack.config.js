const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
    // For now I don't need webpack-merge
    const outdir = env === 'development' ? path.resolve(__dirname, './dist') : path.resolve(__dirname, './public');

    return {
        entry: './src/index.js',
        output: {
            path: outdir,
            filename: 'index.js'
        },
        target: 'web',
        plugins: [
            new HtmlWebpackPlugin({
                template: 'src/index.html'
            }),
            new MiniCssExtractPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader']
                },
            ]
        }
    };
};