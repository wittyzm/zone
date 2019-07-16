//  这个文件位置好后。可以直接使用 webpack 编译entry 和outout  文件


const  path = require('path')

var htmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {
    entry:path.join(__dirname, './src/main.js'),
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'bundle.js'
    },
    devServer:{
        hot:true,
        open:true,
        port:4321
    },
    plugins:[   // 所有webpack 插件的配置节点
        new htmlWebpackPlugin({
            template:path.resolve(__dirname,'src/index.html'),// 模板路径
            filename:'index.html' // 自动生成的html 路径
        }),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin()
    ],
    module:{   // 所有第三方loader 木块
        rules:[  // 第三方匹配规则；
            {test: /\.css$/, use:['style-loader','css-loader']},
            {test: /\.less$/, use:['style-loader','css-loader','less-loader']},
            {test: /\.scss$/, use:['style-loader','css-loader','sass-loader']},
            {test: /\.(jpg|png|gif|bmp|jpeg)$/, use:'url-loader?limit=3000&name=[hash:16]-[name].[ext]'},
            {test: /\.js$/, use: 'babel-loader', exclude:/node_modules/}, //配置 babel 转换高级js
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理 字体文件的 loader
            {test:/\.vue$/,use:'vue-loader'}  // 解析.vue
            //  limit是给定的图片大小，如果图片是小于limit则显示为
            // url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQAB
            // AAD/2wBDAAgGBgcGBQgHBwcJCQgK…gevWvZguBxVHQoYodGtEijRF8sHCqAM4rQPWmA
            // wnFMant1pjUgGHJpVI205elToo2DgUAf/9k=);
        ]
            //  如果是大于或等于limit url(53a478f8a8127de3d8b3bcbeccc4d9d0.jpg)  //这不是base64编码，这样其名为了防止img名称重复，  设置 name=[name].[ext] 可以不改变原名（但是 给的图片在limit以内，则会扔应用base 64编码）
            // name=[name].[ext] 对limit 规格内的图片不会使用原名

        // 因为limit 外的 图片（即limit给的是8000，二图片大小为9000字节），不采用base964, 使用name=[name]
        // .[ext]会出现下面的t同名图片覆盖前面的问题； 前面的图片被下面同名覆盖，
        // 所以此时引用 [hash:16]-name=[name].[ext]------》名字前加hash 值，hash最大32位，


    },
    resolve:{
        alias:{
            /* vue 模块 ，设置引用文件*/
            "vue$":"vue/dist/vue.js"
        }
    }
}