import { chatConstants } from '../actions/constants'
import axios from 'axios'
import { getToken } from '../utils'
import { API_CONFIG } from '../config'

export const getListMessageAction = () => {
    return async dispatch => {
        try {
            const token = getToken()
            dispatch({ type: chatConstants.GET_MESSAGES_REQUEST })
            const { data: { data } } = await axios.get(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/chats/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: chatConstants.GET_MESSAGES_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: chatConstants.GET_MESSAGES_FAILURE,
                payload: error.response?.data?.message || error.message,
            })
        }
    }
}