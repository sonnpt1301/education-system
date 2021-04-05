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

            if (data.user.profile.role === 'admin') {
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: 'Access Denied'
                })
            } else {
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: data.user
                })
            }

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

export const resetPasswordAction = (email) => {
    return async dispatch => {
        try {
            console.log(email)
            dispatch({
                type: authConstants.RESET_PASSWORD_REQUEST
            })
            const { data: { data } } = await axios.post(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/users/forgotPassword`, email, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            console.log(data)
            dispatch({
                type: authConstants.RESET_PASSWORD_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: authConstants.RESET_PASSWORD_FAILURE,
                payload: error.response?.data?.message || error.message,
            })
        }
    }
}

export const createNewPasswordAction = ({ newPass, confirmedPass, token }) => {
    return async dispatch => {
        try {
            dispatch({ type: authConstants.CREATE_NEW_PASSWORD_REQUEST })
            const { data: { data } } = await axios.put(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/users/reset-password/`, { newPass, confirmedPass, token }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })  
            dispatch({
                type: authConstants.CREATE_NEW_PASSWORD_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: authConstants.CREATE_NEW_PASSWORD_FAILURE,
                payload: error.response?.data?.message || error.message,
            })
        }
    }
}