const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
var extractCSS = new ExtractTextPlugin('./css/[name].css')
var extractLESS = new ExtractTextPlugin('./css/[name].less')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ROOT = path.join(__dirname, '..')

module.exports = {
  devtool: '#source-map',
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    publicPath: '/',
    filename: 'build.js',
    path: path.resolve(__dirname, '../dist/'),
    // 此选项决定了非入口(non-entry) chunk 文件的名
    chunkFilename: '[name]-[chunkhash:8].js'
  },
  resolve: {
    //自动解析确定的扩展
    // extensions: ['.js', '.vue'],
    //创建import 或者require的别名，来确保模块引入变得简单
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      { test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'file-loader' },
      {
        test: /\.sass/,
        loader: extractCSS.extract('style', 'css!sass')
      },
      {
        test: /\.less/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          // 如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
          use: ['css-loader', 'less-loader']
        })
      },
      // 使用vue-loader 加载 .vue 结尾的文件
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: 'es2015'
        },
        // 不转换node_modules文件夹(不需要编译)
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        loader: 'url-loader?limit=1'
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',    exclude: /node_modules/,      options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new CopyWebpackPlugin([
        { from: path.join(ROOT, 'src/statics'), to: 'statics' }
    ]),
    new HtmlWebpackPlugin({
      // 生成的目录地址
      filename: './index.html',
      // 根据哪个模板生成
      template: path.resolve(__dirname, '../src/index.html'),
      inject: true
    }),
    new ExtractTextPlugin('style.css')
  ],
  devServer: {
    hot: true,
    inline: true,
    contentBase: path.resolve(__dirname, '../dist/'),
    publicPath: '/',
    historyApiFallback: true,
    proxy:
      {
        '/activeinvestrank/getInvest': {
          target: 'http://192.168.4.18:8085',
          changeOrigin: true,
          secure: false,
          pathRewrite: {
            '^/activeinvestrank/getInvest': '/activeinvestrank/getInvest'
          }
        },
        '/user/autoinvest/alphainvest/protocol': {
          target: 'https://m.tzg.cn',
          changeOrigin: true,
          secure: true,
          pathRewrite: {
            '^/user/autoinvest/alphainvest/protocol': '/user/autoinvest/alphainvest/protocol'
          }
        }
      }
  }
}