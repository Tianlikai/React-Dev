import { createStore, applyMiddleware, compose } from 'redux'
import { createRootReducer } from '../reducers/index'
import createSagaMiddleware, { END } from 'redux-saga'
import sagaMonitor from 'redux-saga'
import middlewares from './middlewares'
import enhancers from './enhancers'
import syncHistoryWithStore from './syncHistoryWithStore'

function configureStore() {
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

const store = configureStore()

export default store

export const history = syncHistoryWithStore(store)

