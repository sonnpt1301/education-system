import { userCourseConstants } from '../actions/constants'

const initState = {
    userCourse: [],
    loading: false,
    error: null
}


// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case userCourseConstants.GET_USER_COURSE_INFO_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userCourseConstants.GET_USER_COURSE_INFO_SUCCESS:
            state = {
                ...state,
                loading: false,
                userCourse: action.payload
            }
            break;
        case userCourseConstants.GET_USER_COURSE_INFO_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload,
            }
            break;
    }
    return state
}
