const path = require('path'),
      webpack = require('webpack'),
      NyanProgressPlugin = require('nyan-progress-webpack-plugin')

let env = process.env.NODE_ENV.trim(), // 当前环境
    commonPath = require('./index') // 项目路径

module.exports = {
  commonPath: commonPath,
  entry: {
    app: path.join(commonPath.src, 'app.js'),
    // ================================
    // 框架 / 类库 分离打包
    // ================================
    vendor: [
      'history',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-saga'
    ]
  },
  output: {
    path: path.join(commonPath.dist, 'static'),
    publicPath: '/static/'
  },
  resolveLoader: {
    root: path.join(commonPath.rootPath, 'node_modules')
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loaders: (function () {
        var _loaders = ['babel?' + JSON.stringify({
          cacheDirectory: true,
          plugins: [
            'transform-runtime',
            'transform-decorators-legacy'
          ],
          presets: ['es2015', 'react', 'stage-0'],
          env: {
            production: {
              presets: ['react-optimize']
            }
          }
        }), 'eslint']

        // 开发环境下引入 React Hot Loader
        if (env === 'development') {
          _loaders.unshift('react-hot')
        }
        return _loaders
      })(),
      include: commonPath.src,
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: 'url',
      query: {
        limit: 10240, // 10KB 以下使用 base64
        name: 'img/[name]-[hash:6].[ext]'
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)$/,
      loader: 'url-loader?limit=10240&name=fonts/[name]-[hash:6].[ext]'
    }]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  plugins: [
    new NyanProgressPlugin(), // 进度条
    new webpack.DefinePlugin({
      'process.env': { // 这是给 React / Redux 打包用的
        NODE_ENV: JSON.stringify('production')
      },
      // ================================
      // 配置开发全局常量
      // ================================
      __DEV__: env === 'development',
      __PROD__: env === 'production',
      __COMPONENT_DEVTOOLS__: false, // 是否使用组件形式的 Redux DevTools 默认关闭
      __WHY_DID_YOU_UPDATE__: env === 'development' // 是否检测不必要的组件重渲染
    })
  ]
}
