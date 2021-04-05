import { getToken } from '../utils'
import axios from 'axios';
import { API_CONFIG } from '../config';
import { userConstants } from './constants';
import qs from 'qs';


export const getListUserAction = (filter) => {
    return async dispatch => {
        try {
            const token = getToken()
            dispatch({ type: userConstants.GET_USERS_REQUEST })
            const query = qs.stringify(filter);
            let endpoint = `${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/users`;
            if (query) {
                endpoint += `?${query}`;
            }
            const { data: { data } } = await axios.get(endpoint, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: userConstants.GET_USERS_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: userConstants.GET_USERS_FAILURE,
                payload: error.response?.data?.message || error.message,
            })
        }
    }
}

export const createUserAction = (body) => {
    return async dispatch => {
        try {
            dispatch({ type: userConstants.ADD_USER_REQUEST });
            const token = getToken();
            const { data: { data } } = await axios.post(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/users`, body, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            dispatch({
                type: userConstants.ADD_USER_SUCCESS,
                payload: data.user
            });
        } catch (error) {
            dispatch({
                type: userConstants.ADD_USER_FAILURE,
                payload: error.response?.data?.message || error.message,
            });
        }
    }
}

export const updateUserAction = ({ id, body }) => {
    return async dispatch => {
        try {
            dispatch({ type: userConstants.UPDATE_USER_REQUEST })
            const token = getToken()
            const { data: { data } } = await axios.put(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/users/${id}`, body, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            dispatch({
                type: userConstants.UPDATE_USER_SUCCESS,
                payload: data.user
            })
        } catch (error) {
            dispatch({
                type: userConstants.UPDATE_USER_FAILURE,
                payload: error.response?.data?.message || error.message,
            });
        }
    }
}

export const deleteUserAction = (id) => {
    return async dispatch => {
        try {
            dispatch({ type: userConstants.DELETE_USER_REQUEST })
            const token = getToken()
            const { data: { data } } = await axios.delete(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/users/${id}`, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            dispatch({
                type: userConstants.DELETE_USER_SUCCESS,
                payload: data.user
            })
        } catch (error) {
            dispatch({
                type: userConstants.DELETE_USER_FAILURE,
                payload: error.response?.data?.message || error.message,
            });
        }
    }
}