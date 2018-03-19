const express = require('express'),
      webpack = require('webpack')
      // proxy = require('http-proxy-middleware'),
      // favicon = require('express-favicon')
let config = require('./webpack.dev.conf'), // 开发环境config
    app = express(),
    compiler = webpack(config)

// for highly stable resources
app.use('/static', express.static(config.commonPath.staticDir))

// 结合proxy使用
// app.use('/api', proxy({
//   target: 'http://127.0.0.1:9900'
// }))
// app.use(favicon(path.join(__dirname, '../favicon.ico')))

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

// enable hot-reload and state-preserving
// compilation error display
app.use(require('webpack-hot-middleware')(compiler))

app.listen(9000, '127.0.0.1', function (err) {
  err && console.log(err)
})
