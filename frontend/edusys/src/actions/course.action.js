import { getToken } from '../utils'
import axios from 'axios';
import { API_CONFIG } from '../config';
import { courseConstants } from './constants';
import qs from 'qs';
import imageCompression from 'browser-image-compression'

export const getCourseDetailAction = (id) => {
    return async dispatch => {
        try {
            const token = getToken()
            dispatch({ type: courseConstants.GET_COURSE_DETAIL_REQUEST })
            const { data: { data } } = await axios.get(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/courses/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            dispatch({
                type: courseConstants.GET_COURSE_DETAIL_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: courseConstants.GET_COURSE_DETAIL_FAILURE,
                payload: error.response?.data?.message || error.message,
            })
        }
    }
}

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

export const createCourseAction = ({ body, bgImage }) => {
    return async dispatch => {
        try {
            const token = getToken()
            dispatch({ type: courseConstants.ADD_COURSE_REQUEST })
            const { data: { data } } = await axios.post(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/courses/`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if (bgImage.name) {
                const uploadBgImage = await imageCompression(bgImage, {
                    maxSizeMB: 0.1,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                })

                const payloadBgImage = new FormData()
                payloadBgImage.append('bgImage', uploadBgImage)

                await axios.post(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/courses/${data._id}/bg-image`, payloadBgImage, {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })
            }
            dispatch({
                type: courseConstants.ADD_COURSE_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: courseConstants.ADD_COURSE_FAILURE,
                payload: error.response?.data?.message || error.message,
            })
        }
    }
}




export const updateCourseAction = ({ id, body, bgImage }) => {
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
            if (bgImage?.name) {
                const uploadBgImage = await imageCompression(bgImage, {
                    maxSizeMB: 0.1,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                })

                const payloadBgImage = new FormData()
                payloadBgImage.append('bgImage', uploadBgImage)

                await axios.post(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/courses/${data._id}/bg-image`, payloadBgImage, {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })
            }
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

export const sendRequestToJoinCourseAction = ({ body }) => {
    return async dispatch => {
        try {
            const token = getToken()
            console.log(body)
            dispatch({ type: courseConstants.SEND_REQUEST_TO_JOIN_COURSE_REQUEST })
            const { data: { data } } = await axios.post(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/user-course/send-request`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(data)
            dispatch({
                type: courseConstants.SEND_REQUEST_TO_JOIN_COURSE_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: courseConstants.SEND_REQUEST_TO_JOIN_COURSE_FAILURE,
                payload: error.response?.data?.message || error.message,
            })
        }
    }
}

export const joinCourseAction = ({ body }) => {
    return async dispatch => {
        try {
            const token = getToken()
            dispatch({ type: courseConstants.JOIN_COURSE_REQUEST })
            const { data: { data } } = await axios.post(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/user-course/join-course`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(data)
            dispatch({
                type: courseConstants.JOIN_COURSE_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: courseConstants.JOIN_COURSE_FAILURE,
                payload: error.response?.data?.message || error.message,
            })
        }
    }
}
