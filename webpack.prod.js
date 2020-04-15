const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new MinifyPlugin({}, { comments: false }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
})
