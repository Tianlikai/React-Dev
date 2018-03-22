import { fork, all } from 'redux-saga/effects'
import { watchLogin } from '../model/login'
import { watchNavigate } from '../model/route'

export const getUser = (state, login) => {
    return state.entities.users[login]
}

export default function* root() {
    yield all([
        fork(watchNavigate),
        fork(watchLogin)
    ])
}

