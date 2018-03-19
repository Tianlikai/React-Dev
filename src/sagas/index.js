import { take, put, call, fork, all } from 'redux-saga/effects'
import { api } from '../services'
import * as actionTypes from '../views/login/actionTypes'
import { login } from '../views/login/action'
import { history } from '../redux/store/configureStore'

export const getUser = (state, login) => {
    return state.entities.users[login]
}

function* fetchEntity(entity, apiFn, id, url) {
    yield put(entity.request(id))
    const { response, error } = yield call(apiFn, url || id)
    if (response.status === 0) {
        yield put(entity.success(id, response))
    }
    else
        yield put(entity.failure(id, error))
}

export const fetchLogin = fetchEntity.bind(null, login, api.fetchUser)

function* loadLogin(userFiled) {
    yield call(fetchLogin, userFiled)
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

