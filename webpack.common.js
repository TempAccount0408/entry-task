const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const src_dir = path.join(__dirname, 'src')
const built_dir = path.join(__dirname, 'built')

const configs = {
    entry: path.join(src_dir, 'index.tsx'),
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
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
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
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('dart-sass'),
                        },
                    },
                ],
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
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(src_dir, '/index.html'),
        }),
    ],
}

module.exports = configs
