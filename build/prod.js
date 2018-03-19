const fs = require('fs'),
      path = require('path'),
      webpack = require('webpack')
      
let config = require('./webpack.prod.conf') // 发布环境config

webpack(config, function (err, stats) {
  // show build info to console
  console.log(stats.toString({ chunks: false, color: true }))

  // save build info to file
  fs.writeFile(
    path.join(config.commonPath.dist, '__build_info__'),
    stats.toString({ color: false })
  )
})
