import { getToken } from '../utils'
import { activityConstants } from './constants'
import axios from 'axios';
import { API_CONFIG } from '../config';


export const getDetailActivityAction = ({ id }) => {
    return async dispatch => {
        try {
            const token = getToken()
            dispatch({ type: activityConstants.GET_DETAIL_ACTIVITY_REQUEST })
            const { data: { data } } = await axios.get(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/activities/${id}/activity-detail`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(data)
            dispatch({
                type: activityConstants.GET_DETAIL_ACTIVITY_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: activityConstants.GET_DETAIL_ACTIVITY_FAILURE,
                payload: error.response?.data?.message || error.message,
            })
        }
    }
}

export const getListActivityAction = ({ id }) => {
    return async dispatch => {
        try {
            const token = getToken()
            dispatch({ type: activityConstants.GET_LIST_ACTIVITY_REQUEST })
            const { data: { data } } = await axios.get(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/activities/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: activityConstants.GET_LIST_ACTIVITY_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: activityConstants.GET_LIST_ACTIVITY_SUCCESS,
                payload: error.response?.data?.message || error.message,
            })
        }
    }
}

export const createActivityAction = ({ courseId, body }) => {
    return async dispatch => {
        try {
            const token = getToken()
            dispatch({ type: activityConstants.CREATE_ACTIVITY_REQUEST })
            const { data: { data } } = await axios.post(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/activities/${courseId}`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: activityConstants.CREATE_ACTIVITY_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: activityConstants.CREATE_ACTIVITY_FAILURE,
                payload: error.response?.data?.message || error.message,
            })
        }
    }
}

export const uploadFileAction = ({ id, files }) => {
    return async dispatch => {
        try {
            const token = getToken()
            dispatch({ type: activityConstants.UPLOAD_FILE_ACTIVITY_REQUEST })
            const payloadFile = new FormData()
            files.map((file) => {
                payloadFile.append('files', file)
            })

            const { data: { data } } = await axios.post(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/activities/${id}/upload-file`, payloadFile, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: activityConstants.UPLOAD_FILE_ACTIVITY_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: activityConstants.UPLOAD_FILE_ACTIVITY_FAILURE,
                payload: error.response?.data?.message || error.message,
            })
        }
    }
}

export const downloadFileAction = ({ fileId, fileName, activityId }) => {
    return async dispatch => {
        try {
            const token = getToken();
            const data = await fetch(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/activities/${activityId}/files/${fileId}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                responseType: 'blob',
            });

            const blob = await data.blob();
            let url = window.URL.createObjectURL(blob, { type: 'application/zip' });
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName + '.zip');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.log(error.response?.data?.message || error.message);
        }
    }
}