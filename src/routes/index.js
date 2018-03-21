import React from 'react'
import ReactDOM from 'react-dom'
import { history } from '../redux/store'
import { Router, Route, IndexRoute, Redirect } from 'react-router'
// import { injectReducer } from '../redux/reducers/index'

// 登录
const Login = (location, cb) => {
    require.ensure([], require => {
        // 立即注入 Reducer
        // injectReducer('login', require('../views/login/reducer').default)
        cb(null, require('../views/login').default)
    }, 'Login')
}
// dashboard
const Main = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../views/main').default)
    }, 'Main')
}
// Exception
const Exception = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../views/exception').default)
    }, 'Exception')
}
const Routes = (
    <Router history={history}>
        <Route path="/">
            <IndexRoute getComponent={Login} />
            <Route getComponent={Login} path="login"></Route>
            <Route getComponent={Main} path="main"></Route>
            <Route getComponent={Exception} path="exception/:status"></Route>
            <Redirect from='*' to='exception/404' />
        </Route>
    </Router>
)

export default Routes

