/* eslint-disable import/no-anonymous-default-export */
import { authConstants } from '../actions/constants'

const initState = {
    user: {},
    authenticate: false,
    authenticating: false,
    error: null,
    message: '',
    loading: false
}

export default (state = initState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
            break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload,
                authenticate: true,
                authenticating: false
            }
            break;
        case authConstants.LOGIN_FAILURE:
            state = {
                ...state,
                error: action.payload,
                authenticating: false
            }
            break;
        case authConstants.LOGIN_RESET:
            state = { ...initState }
            break;
    }
    return state
}