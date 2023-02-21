// webpack.config.js 配置 
const path = require('path');
//  引入自动生成html插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入 css拆分插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 引入打包进度条
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
// 引用plugin
const MyPlugin = require('../plugin/index');
// JS压缩
const TerserPlugin = require('terser-webpack-plugin');
// 引入CSS压缩
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
//  打包体积分析
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  mode: "development", // production 开发模式
  entry: path.resolve(__dirname, '../src/main.js'), // 入口文件
  devtool: 'cheap-module-source-map', // 使用source-map模式
  output: {
    filename: '[name].[hash:8].js', // 打包后文件名称 这里使用hash-->不同的名称
    path: path.resolve(__dirname, '../dist'), // 打包后的目录
    clean: true, // 优先清除之前打包的dist 再将打包内容输入 
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // 解析顺序原则 右-->左
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      {
        test: /\.jsx|\.js$/,
        use: [
          'thread-loader',
          'babel-loader',
          path.resolve(__dirname, '../loader/drop-console.js'),
        ],
        exclude: /node_modules/,//  排除|不包含 该文件
      },
      {
        test: /\.(jpe?g|png|gif)$/i, //图片文件
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      title: 'webpack指定html测试',
      filename: 'index.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      filename: 'header.html',
      chunks: ['header'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].css',
    }),
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`,
    }),
    new MyPlugin(),
    // new BundleAnalyzerPlugin()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'), // 配置路径别名，减少文件搜索范围
    },
    extensions: ['.js', '.json', '.vue'], // 配置文件后缀名自动补全，减少文件搜索范围
  },
  cache: {
    type: 'filesystem', // string: 'memory' | 'filesystem' 内存/文件系统
    cacheDirectory: path.resolve(__dirname, 'webpack_cache'), // 指定缓存目录
    maxAge: 604800000, // 缓存的最长时间（单位为毫秒）
  },
  optimization: {
    minimize: true,
    // js\css压缩
    minimizer: [
      new TerserPlugin({
        parallel: 4
      }),
      new CssMinimizerPlugin({
        parallel: 4,
        // parallel: threads 报错 用4代替
      })
    ],
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
      // 重复打包问题
      cacheGroups: {
        vendors: {
          // node_modules里的代码
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          // name: 'vendors', 一定不要定义固定的name
          priority: 10, // 优先级
          enforce: true,
        }
      }
    }
  }
};