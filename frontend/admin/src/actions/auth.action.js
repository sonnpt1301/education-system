import { authConstants } from './constants';
import axios from 'axios';
import { API_CONFIG } from '../config';


export const loginAction = (user) => {
    return async dispatch => {
        try {
            dispatch({ type: authConstants.LOGIN_REQUEST })
            const { data: { data } } = await axios.post(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/login`, { ...user }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            console.log(data)


            if (data.user.profile.role !== 'admin') {
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: 'Access Denied'
                })
            }

            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: data.user
            })

            localStorage.setItem('jwt', data.accessToken)
            localStorage.setItem('user', JSON.stringify(data.user))
        } catch (error) {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: error.response?.data?.message || error.message,
            })
        }
    }
}

export const logoutAction = () => {
    return async dispatch => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');

        dispatch({ type: authConstants.LOGIN_RESET });
    }
}