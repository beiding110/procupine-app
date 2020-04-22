require('babel-polyfill')

var path = require('path'),
    libraryName = 'mainVue',
    outputFileName = 'zh_app',
    plugins  = [],
    mode = ['development', 'production', 'none'],
    modeIndex = 0;

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: ["babel-polyfill", './src/index.js'],
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: process.env.NODE_ENV === 'production'
            ? outputFileName + '.min.js'
            : outputFileName + '.js',
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    module: {
        rules: [{
            test: /\.js$/,  // 处理后缀名为js的文件
            use: 'babel-loader', // 使用babel-loader进行处理
            exclude: /(node_modules)/  //排除node_modules下的文件
        }]
    },
    resolve: {
        alias: {
            '@': resolve('src'),
        }
    }
};
