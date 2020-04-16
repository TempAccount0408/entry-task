const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { src_dir, built_dir } = require('./paths')

const configs = {
    // entry: path.join(src_dir, 'index.tsx'),
    entry: {
        deps: path.join(src_dir, 'deps.tsx'),
        main: path.join(src_dir, 'index.tsx'),
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].bundle.js',
        path: built_dir,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },

            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader'],
            },
        ],
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        moment: 'moment',
        antd: 'antd',
    },
    plugins: [new CleanWebpackPlugin()],
    optimization: {
        splitChunks: {
            minSize: 30,
            cacheGroups: {
                default: {
                    name: 'common',
                    chunks: 'initial',
                    minChunks: 2,
                    priority: -20,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'initial',
                    priority: -10,
                },
            },
        },
    },
}

module.exports = configs
