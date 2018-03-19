import * as ActionTypes from './actionTypes'

const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function action(type, payload = {}) {
    return { type, ...payload }
}

function createRequestTypes(base) {
    return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
        acc[type] = `${base}_${type}`
        return acc
    }, {})
}

export const LOGIN = createRequestTypes('LOGIN')

export const login = {
    request: user => action(LOGIN[REQUEST], { user }),
    success: (user, response) => action(LOGIN[SUCCESS], { user, response }),
    failure: (user, error) => action(LOGIN[FAILURE], { user, error })
}

export const loginAcion = filed => action(ActionTypes.LOG_IN, filed)
export const navigate = pathname => action(ActionTypes.NAVIGATE, {pathname})
