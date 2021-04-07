import { blogConstants } from '../actions/constants'
import axios from 'axios'
import { getToken } from '../utils'
import { API_CONFIG } from '../config'
import qs from 'qs'
import imageCompression from 'browser-image-compression'

export const getListBLogAction = (filter) => {
    return async dispatch => {
        try {
            const token = getToken()

            dispatch({ type: blogConstants.GET_BLOGS_REQUEST })
            const query = qs.stringify(filter);
            let endpoint = `${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/blogs`;
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
                type: blogConstants.GET_BLOGS_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: blogConstants.GET_BLOGS_FAILURE,
                payload: error.response?.data?.message || error.message,
            })
        }
    }
}

export const createBlogAction = ({ body, bgImage, files }) => {
    return async dispatch => {
        try {
            console.log(body, bgImage, files)
            dispatch({ type: blogConstants.ADD_BLOG_REQUEST })
            const token = getToken()
            // 1. create blog
            const { data: { data } } = await axios.post(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/blogs`, body, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })

            // 2. upload bgImage (check if existed bgImage)
            if (bgImage.name) {
                const uploadBgImage = await imageCompression(bgImage, {
                    maxSizeMB: 0.1,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                })

                const payloadBgImage = new FormData()
                payloadBgImage.append('bgImage', uploadBgImage)

                await axios.post(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/blogs/${data._id}/bg-image`, payloadBgImage, {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })
            }
            // 3. upload file (check if existed file)
            if (files) {
                const payloadFile = new FormData()
                files.map((file) => {
                    payloadFile.append('files', file)
                })

                await axios.post(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/blogs/${data._id}/files`, payloadFile, {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })
            }

            dispatch({
                type: blogConstants.ADD_BLOG_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: blogConstants.ADD_BLOG_FAILURE,
                payload: error.response?.data?.message || error.message,
            })
        }
    }
}

export const updateBlogStatusAction = ({ id, body, bgImage, files }) => {
    return async dispatch => {
        try {
            dispatch({ type: blogConstants.UPDATE_BLOG_REQUEST });
            const token = getToken();

            const { data: { data } } = await axios.put(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/blogs/${id}`, body, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            // 2. upload bgImage (check if existed bgImage)
            if (bgImage.name) {
                const uploadBgImage = await imageCompression(bgImage, {
                    maxSizeMB: 0.1,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                })

                const payloadBgImage = new FormData()
                payloadBgImage.append('bgImage', uploadBgImage)

                await axios.post(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/blogs/${data._id}/bg-image`, payloadBgImage, {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })
            }
            // 3. upload file (check if existed file)
            if (files) {
                const payloadFile = new FormData()
                files.map((file) => {
                    payloadFile.append('files', file)
                })

                await axios.post(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/blogs/${data._id}/files`, payloadFile, {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })
            }

            dispatch({
                type: blogConstants.UPDATE_BLOG_SUCCESS,
                payload: data
            });
        } catch (error) {
            dispatch({
                type: blogConstants.UPDATE_BLOG_FAILURE,
                payload: error.response?.data?.message || error.message,
            })
        }
    }
}