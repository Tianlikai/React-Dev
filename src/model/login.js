import { take, put, call, fork } from 'redux-saga/effects'
import merge from 'lodash/merge'
import { history } from '../redux/store'
import { createAction, createRequestTypes, REQUEST, SUCCESS, FAILURE } from '../redux/action'
import { singin } from '../services/user'
import initState from '../redux/store/initState'

export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'

const LOGIN = createRequestTypes('LOGIN')

const loginEntity = {
    request: user => createAction(LOGIN[REQUEST], { user }),
    success: (user, response) => createAction(LOGIN[SUCCESS], { user, response }),
    failure: (user, error) => createAction(LOGIN[FAILURE], { user, error })
}
const loginAcion = filed => createAction(LOG_IN, filed)

const loadLogin = function* (userFiled, url) {
    yield put(loginEntity.request(userFiled))
    const response = yield call(singin, url || userFiled)
    if (response && response.status === 0) {
        yield put(loginEntity.success(userFiled, response))
        yield history.push('/main')
    }
    else {
        yield put(loginEntity.failure(userFiled))
    }
}

const watchLogin = function* () {
    while (true) {
        const userFiled = yield take(LOG_IN)
        yield fork(loadLogin, userFiled)
    }
}

const loginReducer = (state = initState.userData, action) => {
    switch (action.type) {
        case LOGIN.REQUEST: {
            return state
        }
        case LOGIN.SUCCESS: {
            return merge({}, state, action.response.result)
        }
        case LOGIN.FAILURE: {
            return state
        }
        default: {
            return state
        }
    }
}

export {
    loginAcion,
    loginReducer,
    watchLogin
}
