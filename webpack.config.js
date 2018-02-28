const path = require('path');
const SRC_DIR = path.resolve(__dirname, './src');
const DEVELOPMENT_SRC_DIR = path.resolve(__dirname, './development/src');
const DEVELOPMENT_BUILD_DIR = path.resolve(__dirname, './development/build');
const MODULES_DIR = path.resolve(__dirname, './node_modules');

module.exports = {

    entry: {
        app: DEVELOPMENT_SRC_DIR
    },

    output: {
        path: DEVELOPMENT_BUILD_DIR
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [DEVELOPMENT_SRC_DIR, SRC_DIR],
                loader: 'babel-loader',
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.json', '.jsx'],
        modules: [DEVELOPMENT_SRC_DIR, MODULES_DIR],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },

    devServer: {
        contentBase: DEVELOPMENT_BUILD_DIR,
        historyApiFallback: true,
    },

    mode: 'development',
};