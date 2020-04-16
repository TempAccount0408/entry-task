const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { src_dir, built_dir } = require('./paths')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { minimize: true },
                    },
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { minimize: true },
                    },
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
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(src_dir, '/index.prod.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
    },
})
