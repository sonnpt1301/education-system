/* eslint-disable import/no-anonymous-default-export */
import { authConstants, userConstants } from '../actions/constants'

const initState = {
    user: {},
    authenticate: false,
    authenticating: false,
    error: null,
    message: '',
    loading: false,
    state: false,
    loadingSendRequest: false,
    loadingResetPassword: false,
    errorSendRequest: false,
    errorResetPassword: false,
    isSent: false,
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

        case authConstants.RESET_PASSWORD_REQUEST:
            state = {
                ...state,
                loadingSendRequest: true
            }
            break;
        case authConstants.RESET_PASSWORD_SUCCESS:
            state = {
                ...state,
                loadingSendRequest: false,
                isSent: true
            }
            break;
        case authConstants.RESET_PASSWORD_FAILURE:
            state = {
                ...state,
                loadingSendRequest: false,
                errorSendRequest: action.payload
            }
            break;
        case authConstants.CREATE_NEW_PASSWORD_REQUEST:
            state = {
                ...state,
                loadingResetPassword: true
            }
            break;
        case authConstants.CREATE_NEW_PASSWORD_SUCCESS:
            state = {
                ...state,
                loadingResetPassword: false,
                errorResetPassword: null
            }
            break;
        case authConstants.CREATE_NEW_PASSWORD_FAILURE:
            state = {
                ...state,
                loadingResetPassword: false,
                errorResetPassword: action.payload
            }
            break;
        case userConstants.UPDATE_USER_REQUEST:
            state = {
                ...state,
                loadingUpdate: true
            }
            break;
        case userConstants.UPDATE_USER_SUCCESS:
            state = {
                ...state,
                user: action.payload,
                loadingUpdate: false
            }
            break;
        case userConstants.UPDATE_USER_FAILURE:
            state = {
                ...state,
                errorUpdate: action.payload,
                loadingUpdate: false
            }
            break;
    }
    return state
}