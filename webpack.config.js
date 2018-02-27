const path = require('path');
const SRC_DIR = path.resolve(__dirname, './src');
const MODULES_DIR = path.resolve(__dirname, './node_modules');

module.exports = {

    entry: {
        app: SRC_DIR + '/index'
    },

    output: {
        path: path.resolve(__dirname, 'build'),
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [SRC_DIR],
                loader: 'babel-loader',
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.json', '.jsx'],
        modules: [SRC_DIR, MODULES_DIR],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
};