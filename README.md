# React Dev redux
------
这款入门套件旨在让您使用一系列极好的前端技术来启动和运行。

该项目的主要目标是为构建现代Web应用提供稳定的基础。 它的目的不是规定你的项目结构或演示一个`完整的应用程序，而是提供一组工具，旨在使前端开发更健壮，更简单，最重要的是，更有趣。 查看下面的完整功能列表！

## 目录
1. [要求](#要求)
1. [开始](#开始)
1. [启动项目](#启动项目)
1. [项目结构](#项目结构)
1. [项目特点](#项目特点)
1. [redux-saga](#redux-saga)
1. [代码规范](#代码规范)
1. [mock](#mock)
1. [测试](#测试)
1. [开发](#开发)
1. [部署](#部署)
1. [服务器端渲染](#服务器端渲染)
1. [性能优化](#性能优化)
1. [参考](#参考)

## 要求
* node `^7.10.0`
* npm `^4.2.0`

## 开始

在确认您的环境符合上述[要求](#要求)后，您可以通过执行以下操作来基于`React Dev`创建一个新项目：

```bash
$ git clone 
https://github.com/Tianlikai/React-Dev.git 
$ cd <my-project-name>
```

完成后，安装项目依赖项。 建议您使用Yarn进行确定性依赖管理，但cnpm install就足够了。

```bash
$ cnpm install  # Install project dependencies (or `yarn add`)
```

## 启动项目

完成[开始](#开始)步骤后，即可开始项目！

```bash
$ npm start  # Start the development server (or `yarn start`)
```

在开发过程中，您还可以使用其他脚本：

|`npm <script>`    |Description|
|-------------------|-----------|
|`start`            |Serves your app at `localhost:9000`|
|`build`            |Builds the application to ./dist|

## 项目结构

本项目目录结构综合了按功能组织和mvc结构.

```
.
├── build                    # webpack 打包配置
│   ├── dev                  # 启动开发服务
│   ├── index                # 打包目录配置
│   ├── prod                 # 启动发布服务
│   ├── webpack.base.conf    # webpack基础配置
│   ├── webpack.dev.conf     # 开发环境 区别配制
│   └── webpack.prod.conf    # 发布环境 区别配置
├── src                      # 应用程序源代码
├── ├── assets               # 样式，图片
│   ├── components           # 可重用组件
│   ├── model                # 按功能组织模块 每个模块包含action、redux-saga、reducer
│   │   ├── login            # 处理login相关业务
│   │   └── route            # 处理路由相关业务
│   ├── redux                # redux 全局文件
│   │   ├── action           # 目录下包含action全局文件
│   │   ├── reducers         # reducer全局文件，合并reducer、按需插入reducer
│   │   └── store            # store全局文件
|   |       ├── enhancers    # Store 增强器 Redux DevTools
|   |       ├── index        # export 增强、结合redux-saga的store
|   |       ├── initState    # 项目状态结构
|   |       ├── middle...    # 中间件打印日志
|   |       └── syncHi...    # store、route同步
│   ├── routes               # 项目路由
│   ├── sagas                # rootSaga 监听所有异步请求
│   ├── services             # 定义所有异步请求 可以按功能组织
│   ├── utils.js             # 工具函数 
│   │   └── request          # 封装fetch 
│   ├── views.js             # 视图文件 每个文件对应一个应用模块
│   │   ├── login            # login页面
│   │   └── main             # main页面
│   ├── app.js               # 项目入口
│   └── index.html           # Main HTML page container for app
└── static                   # 静态文件
```

## 项目特点

* Hot Reloading 当应用程序在开发模式下运行时(`npm start`)，默认启用热重载。 此功能是通过webpack的[Hot Module Replacement][Hot Module Replacement]功能实现的，代码更新可以在应用程序运行时注入到代码更新中，而不会完全重新加载
* 优化目录结构，更好的模块分离，model文件集中管理了action、saga、reducer
* Redux DevTools，可选[Redux DevTools Chrome Extension][Redux DevTools Chrome Extension]
* [Redux Logger][redux-logger] 打印动作及前后状态变化
* [why-did-you-update][why-did-u-update] 检测不必要的组件重渲染（默认关闭）
* 引入服务层统一管理 fetch 请求此处参考[ant-design-pro][ant-design-pro]
* 生产环境下的编译对代码进行[优化][react-optimize]

## redux-saga
本案例使用Redux-Saga处理异步请求，借鉴[ant-design-pro][ant-design-pro]对Redux-Saga的应用案例实现。

## 代码规范
使用Eslint进行代码约束，详细配置`.eslintrc`、`.eslintignore`

## mock
本案例使用[mockjs][mockjs]模拟数据，目前只是简单应用，准备借鉴[roadhog](https://github.com/sorrycc/roadhog)配合[roadhog-api-doc](https://github.com/nikogu/roadhog-api-doc)实现真是场景的应用

## 测试
待研究

## 开发
使用快速编译的 `hot reloding`
```bash
$ npm start 
```

## 部署
使用`npm run build`生成的 `./ dist`文件夹来部署。
```bash
$ npm run build 
```
使用像nginx这样的网络服务器来提供应用程序。 确保将传入的路由请求引导至根目录'./dist/ index.html'文件，以便客户端应用程序将被加载, react路由会通过映射按需加载其余的文件。 如果你不确定如何做到这一点，你可能会发现[本文档][configuring-your-server]很有帮助。

## 服务器端渲染
服务器端实践，正在折腾[server-render][server-render]

## 性能优化
* [reselect](https://github.com/reactjs/reselect)为输入设置了缓存，只有当输入没有改变时，程序就会命中缓存
* React 文档 · [Advanced Performance](https://facebook.github.io/react/docs/advanced-performance.html)
* 反鸡汤 · [Should I use shouldComponentUpdate](http://jamesknelson.com/should-i-use-shouldcomponentupdate/)（[译文](http://www.infoq.com/cn/news/2016/07/react-shouldComponentUpdate)）
* 淘宝 FED · [高性能 React 组件](http://taobaofed.org/blog/2016/08/12/optimized-react-components/)
* 腾讯 Dev Club · [React 移动 Web 极致优化](http://dev.qq.com/topic/579083d1c9da73584b02587d)

## 参考

* [redux](https://github.com/reactjs/redux) 最好是能看书，强烈推荐`《深入浅出React和Redux》`
* [ant-design-pro](https://github.com/ant-design/ant-design-pro/) 借鉴其对redux-saga异步调用的实践运用和fetch封装
* [redux-saga](https://github.com/redux-saga/redux-saga) 基于Generator的异步请求处理方案
* [react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit) github上start比较多的react开发脚手架
* [kenberkeley](https://github.com/kenberkeley/react-demo.git) 好理解版本的react-redux-starter-kit

[mockjs]: http://mockjs.com
[ant-design-pro]: https://github.com/ant-design/ant-design-pro/tree/master/src/models
[server-render]: https://github.com/redux-saga/redux-saga/tree/master/examples/real-world
[configuring-your-server]: https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md#configuring-your-server
[Hot Module Replacement]: https://webpack.github.io/docs/hot-module-replacement.html
[ant-design-pro]: https://github.com/ant-design/ant-design-pro/blob/master/src/utils/request.js
[Redux DevTools Chrome Extension]:https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
[redux-logger]: https://github.com/evgenyrodionov/redux-logger
[why-did-u-update]: https://github.com/garbles/why-did-you-update
[react-optimize]: https://github.com/thejameskyle/babel-react-optimize
