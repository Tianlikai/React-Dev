import { take } from 'redux-saga/effects'
import { history } from '../redux/store'
import { createAction } from '../redux/action'

export const NAVIGATE = 'NAVIGATE'
const navigate = pathname => createAction(NAVIGATE, {pathname})

const watchNavigate = function* () {
    while (true) {
        const { pathname } = yield take(NAVIGATE)
        yield history.push(pathname)
    }
}


export {
    navigate,
    watchNavigate
}
