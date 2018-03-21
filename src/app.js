/* 入口启动文件 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Route from './routes/index'
import '../static/bootstrap/css/normalize.css'
import rootSaga from './sagas'
import store from './redux/store'

/*
 * whyDidYouUpdate检测不必要的重新渲染，详情请看其项目地址：
 * https://github.com/garbles/why-did-you-update
 */
if (__DEV__ && __WHY_DID_YOU_UPDATE__ && false) {
  const { whyDidYouUpdate } = require('why-did-you-update')
  whyDidYouUpdate(React)
}
if (__DEV__) {
  console.info('[当前环境] 开发环境')
}
if (__PROD__) {
  console.info('[当前环境] 生产环境')
}
store.runSaga(rootSaga)
const MOUNT_NODE = document.getElementById('app')

// 将根组件挂载到 DOM，启动！
ReactDOM.render(
  <Provider
    store={store}>
    {Route}
  </Provider>,
  MOUNT_NODE
)

