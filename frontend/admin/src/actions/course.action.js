import { getToken } from '../utils'
import axios from 'axios';
import { API_CONFIG } from '../config';
import { courseConstants } from './constants';
import qs from 'qs';

export const getListCourseAction = (filter) => {
    return async dispatch => {
        try {
            const token = getToken()
            dispatch({ type: courseConstants.GET_COURSES_REQUEST })
            const query = qs.stringify(filter)
            let endpoint = `${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/courses/`
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
                type: courseConstants.GET_COURSES_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: courseConstants.GET_COURSES_FAILURE,
                payload: error.response?.data?.message || error.message,
            })
        }
    }
}


export const updateCourseAction = ({ id, body }) => {
    return async dispatch => {
        try {
            const token = getToken()
            dispatch({ type: courseConstants.UPDATE_COURSE_REQUEST })
            const { data: { data } } = await axios.put(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/courses/${id}`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(id, body)
            dispatch({
                type: courseConstants.UPDATE_COURSE_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: courseConstants.UPDATE_COURSE_REQUEST,
                payload: error.response?.data?.message || error.message,
            })
        }
    }
}

// export const deleteCategoryAction = (id) => {
//     return async dispatch => {
//         try {
//             dispatch({ type: categoryConstants.DELETE_CATEGORY_REQUEST })
//             const token = getToken()
//             const { data: { data } } = await axios.delete(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/categories/${id}`, {
//                 headers: {
//                     'Content-type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//             })
//             dispatch({
//                 type: categoryConstants.DELETE_CATEGORY_SUCCESS,
//                 payload: data
//             })
//         } catch (error) {
//             dispatch({
//                 type: categoryConstants.DELETE_CATEGORY_FAILURE,
//                 payload: error.response?.data?.message || error.message,
//             });
//         }
//     }
// }

