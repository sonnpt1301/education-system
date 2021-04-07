import { getToken } from '../utils'
import axios from 'axios';
import { API_CONFIG } from '../config';
import { categoryConstants } from './constants';
import qs from 'qs';

export const getListCategoryAction = (filter) => {
    return async dispatch => {
        try {
            const token = getToken()
            dispatch({ type: categoryConstants.GET_CATEGORIES_REQUEST })
            const query = qs.stringify(filter)
            let endpoint = `${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/categories/`
            if (query) {
                endpoint += `?${query}`
            }
            const { data: { data } } = await axios.get(endpoint, {
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
