import { userCourseConstants } from './constants'
import { getToken } from '../utils'
import axios from 'axios';
import { API_CONFIG } from '../config';

export const getUserCourseInfoAction = () => {
    return async dispatch => {
        try {
            const token = getToken()
            dispatch({ type: userCourseConstants.GET_USER_COURSE_INFO_REQUEST })
            const { data: { data } } = await axios.get(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/user-course/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            dispatch({
                type: userCourseConstants.GET_USER_COURSE_INFO_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: userCourseConstants.GET_USER_COURSE_INFO_FAILURE,
                payload: error.response?.data?.message || error.message,
            })
        }
    }
}