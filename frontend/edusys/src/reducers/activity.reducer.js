import { activityConstants } from '../actions/constants'

const initState = {
    activityList: [],
    activityDetail: {},
    loading: false,
    error: null,
    loadingCreate: false,
    errorCreate: null,
    loadingDetail: false,
    errorDetail: null,
    loadingUpload: false,
    errorUpload: null,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case activityConstants.GET_DETAIL_ACTIVITY_REQUEST:
            state = {
                ...state,
                loadingDetail: true
            }
            break;
        case activityConstants.GET_DETAIL_ACTIVITY_SUCCESS:
            state = {
                ...state,
                activityDetail: action.payload,
                loadingDetail: false,
                errorDetail: null
            }
            break;
        case activityConstants.GET_DETAIL_ACTIVITY_FAILURE:
            state = {
                ...state,
                loadingDetail: false,
                errorDetail: action.payload,
            }
            break;
        case activityConstants.GET_LIST_ACTIVITY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case activityConstants.GET_LIST_ACTIVITY_SUCCESS:
            state = {
                ...state,
                activityList: action.payload,
                loading: false
            }
            break;
        case activityConstants.GET_LIST_ACTIVITY_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload,
            }
            break;
        case activityConstants.CREATE_ACTIVITY_REQUEST:
            state = {
                ...state,
                loadingCreate: true
            }
            break;
        case activityConstants.CREATE_ACTIVITY_SUCCESS:
            state = {
                ...state,
                activityList: action.payload,
                loadingCreate: false,
                errorCreate: null
            }
            break;
        case activityConstants.CREATE_ACTIVITY_FAILURE:
            state = {
                ...state,
                loadingCreate: false,
                errorCreate: action.payload,
            }
            break;
        case activityConstants.UPLOAD_FILE_ACTIVITY_REQUEST:
            state = {
                ...state,
                loadingUpload: true
            }
            break;
        case activityConstants.UPLOAD_FILE_ACTIVITY_SUCCESS:
            state = {
                ...state,
                activityDetail: action.payload,
                loadingUpload: false,
                errorUpload: null
            }
            break;
        case activityConstants.UPLOAD_FILE_ACTIVITY_FAILURE:
            state = {
                ...state,
                loadingUpload: false,
                errorUpload: action.payload,
            }
            break;
    }
    return state
}