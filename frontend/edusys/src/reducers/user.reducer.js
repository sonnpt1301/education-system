/* eslint-disable import/no-anonymous-default-export */
import { userConstants } from '../actions/constants'

const initState = {
    userList: [],
    loading: false,
    error: null,
    loadingCreate: false,
    loadingDelete: false,
    loadingUpdate: false,
    errorCreate: null,
    errorUpdate: null,
    errorDelete: null
}
export default (state = initState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case userConstants.GET_USERS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstants.GET_USERS_SUCCESS:
            state = {
                ...state,
                loading: false,
                userList: action.payload
            }
            break;
        case userConstants.GET_USERS_FAILURE:
            state = {
                ...state,
                error: action.payload
            }
            break;
        case userConstants.ADD_USER_REQUEST:
            state = {
                ...state,
                loadingCreate: true
            }
            break;
        case userConstants.ADD_USER_SUCCESS:
            state = {
                ...state,
                loadingCreate: false
            }
            break;
        case userConstants.ADD_USER_FAILURE:
            state = {
                ...state,
                loadingCreate: false,
                errorCreate: action.payload
            }
            break;
        // case userConstants.UPDATE_USER_REQUEST:
        //     state = {
        //         ...state,
        //         loadingUpdate: true
        //     }
        //     break;
        // case userConstants.UPDATE_USER_SUCCESS:
        //     state = {
        //         ...state,
        //         user: action.payload,
        //         loadingUpdate: false
        //     }
        //     break;
        // case userConstants.UPDATE_USER_FAILURE:
        //     state = {
        //         ...state,
        //         errorUpdate: action.payload,
        //         loadingUpdate: false
        //     }
        //     break;
    }
    return state
}