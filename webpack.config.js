const path = require('path');
const webpack = require('webpack');
//const merge = require('webpack-merge');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
//
// let config;
// try {
//     config = require('./build.config');
// } catch (e) {
//     config = require('./build.config.default');
// }

const SRC_DIR = path.resolve(__dirname, './src');
const MODULES_DIR = path.resolve(__dirname, './node_modules');
const PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {

    entry: {
        app: SRC_DIR + '/index',
        vendor: [
            'react',
        ],
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        chunkFilename: '[name].[chunkhash].js',
        filename: '[name].[chunkhash].js'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [SRC_DIR],
                loader: 'babel-loader',
            },
            // {
            //     test: /\.css$/,
            //     include: [SRC_DIR],
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: [
            //             {
            //                 loader: 'css-loader',
            //                 options: {
            //                     importLoaders: 1,
            //                     modules: true,
            //                     localIdentName: '[name]--[local]--[hash:base64:5]',
            //                     sourceMap: !PRODUCTION,
            //                     minimize: PRODUCTION,
            //                 },
            //             },
            //             'postcss-loader',
            //         ],
            //     }),
            // },
        ],
    },

    plugins: [
        // new HtmlWebpackPlugin({
        //     title: 'Caching and Code Splitting',
        //     template: SRC_DIR + '/web-client/static/index.html'
        // }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor'
        }),
        // new ExtractTextPlugin({
        //     filename: '[name].[contenthash].css',
        //     allChunks: true
        // }),
    ].concat(PRODUCTION ? [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new webpack.optimize.UglifyJsPlugin(),
    ] : []),

    resolve: {
        extensions: ['.js', '.json', '.jsx'],
        modules: [SRC_DIR, MODULES_DIR],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },

    devtool: !PRODUCTION && 'inline-source-map',

    devServer: !PRODUCTION && {
        contentBase: path.join(__dirname, 'src/web-client/static'),
        port: 9000,
        historyApiFallback: true,
    },

};