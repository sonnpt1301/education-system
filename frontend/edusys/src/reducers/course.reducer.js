/* eslint-disable import/no-anonymous-default-export */
import { courseConstants } from '../actions/constants'

const initState = {
    courseList: [],
    courseDetail: {},
    loading: false,
    error: null,
    loadingCourseDetail: false,
    loadingCreate: false,
    loadingDelete: false,
    loadingUpdate: false,
    errorCreate: null,
    errorUpdate: null,
    errorDelete: null,
    loadingSendRequest: false,
    errorSendRequest: null,
    loadingJoinCourse: false,
    errorJoinCourse: null,
    isJoin: {}
}
export default (state = initState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case courseConstants.GET_COURSE_DETAIL_REQUEST:
            state = {
                ...state,
                loadingCourseDetail: true
            }
            break;
        case courseConstants.GET_COURSE_DETAIL_SUCCESS:
            state = {
                ...state,
                loadingCourseDetail: false,
                courseDetail: action.payload,
                isJoin: false,
                error: null
            }
            break;
        case courseConstants.GET_COURSE_DETAIL_FAILURE:
            state = {
                ...state,
                loadingCourseDetail: false,
                error: action.payload,
            }
            break;
        case courseConstants.GET_COURSES_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case courseConstants.GET_COURSES_SUCCESS:
            state = {
                ...state,
                loading: false,
                courseList: action.payload
            }
            break;
        case courseConstants.GET_COURSES_FAILURE:
            state = {
                ...state,
                error: action.payload
            }
            break;
        case courseConstants.ADD_COURSE_REQUEST:
            state = {
                ...state,
                loadingCreate: true
            }
            break;
        case courseConstants.ADD_COURSE_SUCCESS:
            state = {
                ...state,
                loadingCreate: false,
                errorCreate: null
            }
            break;
        case courseConstants.ADD_COURSE_FAILURE:
            state = {
                ...state,
                loadingCreate: false,
                errorCreate: action.payload
            }
            break;
        case courseConstants.UPDATE_COURSE_REQUEST:
            state = {
                ...state,
                loadingUpdate: true
            }
            break;
        case courseConstants.UPDATE_COURSE_SUCCESS:
            state = {
                ...state,
                loadingUpdate: false,
                errorUpdate: null
            }
            break;
        case courseConstants.UPDATE_COURSE_FAILURE:
            state = {
                ...state,
                errorUpdate: action.payload,
                loadingUpdate: false
            }
            break;
        case courseConstants.DELETE_COURSE_REQUEST:
            state = {
                ...state,
                loadingDelete: true,
            }
            break;
        case courseConstants.DELETE_COURSE_SUCCESS:
            state = {
                ...state,
                loadingDelete: false
            }
            break;
        case courseConstants.DELETE_COURSE_FAILURE:
            state = {
                ...state,
                errorDelete: action.payload,
                loadingDelete: false
            }
            break;
        case courseConstants.SEND_REQUEST_TO_JOIN_COURSE_REQUEST:
            state = {
                ...state,
                loadingSendRequest: true
            }
            break;
        case courseConstants.SEND_REQUEST_TO_JOIN_COURSE_SUCCESS:
            state = {
                ...state,
                loadingSendRequest: false
            }
            break;
        case courseConstants.SEND_REQUEST_TO_JOIN_COURSE_FAILURE:
            state = {
                ...state,
                errorSendRequest: action.payload,
                loadingSendRequest: false
            }
            break;
        case courseConstants.JOIN_COURSE_REQUEST:
            state = {
                ...state,
                loadingJoinCourse: true
            }
            break;
        case courseConstants.JOIN_COURSE_SUCCESS:
            state = {
                ...state,
                loadingJoinCourse: false,
                isJoin: action.payload,
                errorJoinCourse: null,
            }
            break;
        case courseConstants.JOIN_COURSE_FAILURE:
            state = {
                ...state,
                errorJoinCourse: action.payload,
                loadingJoinCourse: false
            }
            break;


    }
    return state
}