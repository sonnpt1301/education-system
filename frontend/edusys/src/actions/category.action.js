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
