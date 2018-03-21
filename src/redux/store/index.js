import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import sagaMonitor from 'redux-saga'
import syncHistoryWithStore from './syncHistoryWithStore'
import { createRootReducer } from '../reducers/index'
import middlewares from './middlewares'
import enhancers from './enhancers'

/**
 * @return {obj} store
 * 返回一个增强的store
 * 初始化reducer
 * 添加中间件
 * enhancers 增加DevTools
 */
const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
  middlewares.unshift(sagaMiddleware)
  const store = createStore(
    createRootReducer(),
    compose(
      applyMiddleware(...middlewares),
      ...enhancers
    )
  )
  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  return store
}

// 创建唯一store
const store = configureStore()
export default store

// 路由同步store
export const history = syncHistoryWithStore(store)



