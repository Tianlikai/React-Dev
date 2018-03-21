import { take, put, call, fork, all } from 'redux-saga/effects'
import * as actionTypes from '../views/login/actionTypes'
import { login as loginEntity } from '../views/login/action'
import { history } from '../redux/store'
import { singin } from '../services/user'

export const getUser = (state, login) => {
    return state.entities.users[login]
}

// function* fetchEntity(entity, apiFn, id, url) {
//     yield put(entity.request(id))
//     const response = yield call(apiFn, url || id)
//     if (response && response.status === 0)
//         yield put(entity.success(id, response))
//     else
//         yield put(entity.failure(id))
// }

// export const fetchLogin = fetchEntity.bind(null, login, singin)

function* loadLogin(userFiled, url) {
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
function* watchLogin() {
    while (true) {
        const userFiled = yield take(actionTypes.LOG_IN)
        yield fork(loadLogin, userFiled)
    }
}
function* watchNavigate() {
    while (true) {
        const { pathname } = yield take(actionTypes.NAVIGATE)
        yield history.push(pathname)
    }
}
export default function* root() {
    yield all([
        fork(watchNavigate),
        fork(watchLogin)
    ])
}

