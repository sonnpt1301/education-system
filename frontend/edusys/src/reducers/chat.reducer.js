/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { chatConstants } from '../actions/constants'

const initState = {
    messages: [],
    loading: false,
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
        case chatConstants.GET_MESSAGE_AFTER_SEND:
            state = {
                ...state,
                messages: state.messages.concat(action.payload.msg),
                loading: false
            }
            break;
    }
    return state
}