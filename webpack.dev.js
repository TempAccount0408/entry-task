const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { src_dir, built_dir } = require('./paths')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('dart-sass'),
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(src_dir, '/index.dev.html'),
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
})
