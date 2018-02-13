
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')

module.exports = function (env = {}) {
  if (env.production) { process.env.NODE_ENV = 'production' }

  function makeStyleLoader (type) {
    const cssLoader = {
      loader: 'css-loader',
      options: {
        minimize: env.production
      }
    }
    const loaders = [ cssLoader ]
    if (type) { loaders.push(type + '-loader') }
    if (env.production) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return [ 'vue-style-loader' ].concat(loaders)
    }
  }

  return {
    entry: './docs/index.js',
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: env.production ? '[name].min.js?[chunkhash]' : '[name].js'
    },
    plugins: env.production ? [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new ExtractTextPlugin({
        filename: 'css/style.min.css?[contenthash]'
      }),
      new AssetsPlugin({
        filename: 'assets.json',
        path: path.resolve(__dirname, '../dist'),
        fullPath: false
      })
    ] : [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'docs/index.html',
        inject: true
      })
    ],
    devtool: env.production ? false : '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              css: makeStyleLoader(),
              scss: makeStyleLoader('sass')
            }
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.s[a|c]ss$/,
          use: makeStyleLoader('sass')
        },
        {
          test: /\.(png|jpg)$/,
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]?[hash]'
          }
        }
      ]
    },
    resolve: {
      extensions: [ '.js', '.vue', '.json' ],
      alias: {
        'docs': path.resolve(__dirname, '../docs'),
        'vue-react-dnd': path.resolve(__dirname, '../src')
      }
    },
    devServer: {
      contentBase: false,
      hot: true
    }
  }
}
