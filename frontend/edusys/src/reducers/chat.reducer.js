/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { chatConstants } from '../actions/constants'

const initState = {
    messages: [],
    loading: false,
    data: {},
    error: null
}

export default (state = initState, action) => {
    switch (action.type) {
        case chatConstants.GET_MESSAGES_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case chatConstants.GET_MESSAGES_SUCCESS:
            state = {
                ...state,
                messages: action.payload,
                loading: false
            }
            break;
        case chatConstants.GET_MESSAGES_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        case chatConstants.UPLOAD_FILE_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case chatConstants.UPLOAD_FILE_SUCCESS:
            state = {
                ...state,
                data: action.payload,
                loading: false,
                error: null
            }
            break;
        case chatConstants.UPLOAD_FILE_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;

    }
    return state
}