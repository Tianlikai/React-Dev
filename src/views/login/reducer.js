import * as ActionTypes from './action'
import initState from '../../redux/store/initState'
import merge from 'lodash/merge'

function loginReducer(state = initState.userData, action) {
    switch (action.type) {
        case ActionTypes.LOGIN.REQUEST: {
            return state
        }
        case ActionTypes.LOGIN.SUCCESS: {
            return merge({}, state, action.response.result)
        }
        case ActionTypes.LOGIN.FAILURE: {
            return state
        }
        default: {
            return state
        }
    }
}
export default loginReducer
