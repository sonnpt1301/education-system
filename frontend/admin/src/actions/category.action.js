import { getToken } from '../utils'
import axios from 'axios';
import { API_CONFIG } from '../config';
import { categoryConstants } from './constants';
import qs from 'qs';

export const getListCategoryAction = () => {
    return async dispatch => {
        try {
            const token = getToken()
            dispatch({ type: categoryConstants.GET_CATEGORIES_REQUEST })
            const { data: { data } } = await axios.get(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/categories/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: categoryConstants.GET_CATEGORIES_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: categoryConstants.GET_CATEGORIES_FAILURE,
                payload: error.response?.data?.message || error.message,
            })
        }
    }
}

export const createCategoryAction = (body) => {
    return async dispatch => {
        try {
            const token = getToken()
            dispatch({ type: categoryConstants.ADD_CATEGORY_REQUEST })
            const { data: { data } } = await axios.post(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/categories/`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: categoryConstants.ADD_CATEGORY_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: categoryConstants.ADD_CATEGORY_FAILURE,
                payload: error.response?.data?.message || error.message,
            })
        }
    }
}

export const updateCategoryAction = ({ id, body }) => {
    return async dispatch => {
        try {
            const token = getToken()
            dispatch({ type: categoryConstants.UPDATE_CATEGORY_REQUEST })
            const { data: { data } } = await axios.put(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/categories/${id}`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: categoryConstants.UPDATE_CATEGORY_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: categoryConstants.UPDATE_CATEGORY_REQUEST,
                payload: error.response?.data?.message || error.message,
            })
        }
    }
}

export const deleteCategoryAction = (id) => {
    return async dispatch => {
        try {
            dispatch({ type: categoryConstants.DELETE_CATEGORY_REQUEST })
            const token = getToken()
            const { data: { data } } = await axios.delete(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/categories/${id}`, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            dispatch({
                type: categoryConstants.DELETE_CATEGORY_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: categoryConstants.DELETE_CATEGORY_FAILURE,
                payload: error.response?.data?.message || error.message,
            });
        }
    }
}

