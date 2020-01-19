
const path = require('path');
const HWP = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: path.join(__dirname, '/src/index.js'),
    output: {
        filename: 'build.js',
        path: path.join(__dirname, 'dist'),
        // publicPath: '/sapient_assignment/dist/',
    },
    devtool: 'eval',
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(css|scss)$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true, // webpack@2.x and newer,
                            name: "./images/[name].[ext]",
                        },
                    },
                ],
            },
            {
                test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg)$/,
                loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'
            },
            {
                test: /\.((ttf|ttc|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|ttc|eot)$/,
                loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'
            }

        ]
    },
    resolve: {
        extensions: ['.css', '.jsx', '.js', '.json', '.scss', '.png', '.jpeg', 'jpg']
    },
    plugins: [
        new HWP(
            { template: path.join(__dirname, '/public/index.html') }
        ),
        new Dotenv()
    ]
}