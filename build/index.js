const   path = require('path')
let rootPath = path.resolve(__dirname, '..') // 项目根目录
         src = path.join(rootPath, 'src') // 开发源码目录

let commonPath = {
    rootPath: rootPath,
    src: src,
    dist: path.join(rootPath, 'dist'), // build 后输出目录
    indexHTML: path.join(src, 'index.html'), // 入口基页
    staticDir: path.join(rootPath, 'static') // 无需处理的静态资源目录
}

module.exports = commonPath 