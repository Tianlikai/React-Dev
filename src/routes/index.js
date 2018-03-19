import React from 'react'
import ReactDOM from 'react-dom'
import { history } from '../redux/store/configureStore'
import { Router, Route, IndexRoute } from 'react-router'
// import { injectReducer } from '../redux/reducers/index'

// Login
const Login = (location, cb) => {
    require.ensure([], require => {
        // 立即注入 Reducer
        // injectReducer('login', require('../views/login/reducer').default)
        cb(null, require('../views/login').default)
    }, 'Login')
}
// Main
const Main = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../views/main').default)
    }, 'Main')
}
/* 管理员平台  end */
const Routes = (
    <Router history={history}>
        <Route path="/">
            <IndexRoute getComponent={Login} />
            <Route getComponent={Login} path="login"></Route>
            <Route getComponent={Main} path="main">
            </Route>
        </Route>
    </Router>
)

export default Routes

