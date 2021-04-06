/* eslint-disable import/no-anonymous-default-export */
import { blogConstants } from '../actions/constants'

const initState = {
    blogList: [],
    loading: false,
    error: null,
    loadingCreate: false,
    loadingDelete: false,
    loadingUpdate: false,
    errorCreate: null,
    errorUpdate: null,
    errorDelete: null
}
export default (state = initState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case blogConstants.GET_BLOGS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case blogConstants.GET_BLOGS_SUCCESS:
            state = {
                ...state,
                loading: false,
                blogList: action.payload
            }
            break;
        case blogConstants.GET_BLOGS_FAILURE:
            state = {
                ...state,
                error: action.payload,
                loading: false
            }
            break;
        case blogConstants.ADD_BLOG_REQUEST:
            state = {
                ...state,
                loadingCreate: true
            }
            break;
        case blogConstants.ADD_BLOG_SUCCESS:
            state = {
                ...state,
                loadingCreate: false,
                errorCreate: null
            }
            break;
        case blogConstants.ADD_BLOG_FAILURE:
            state = {
                ...state,
                errorCreate: action.payload,
                loadingCreate: false
            }
            break;
    }
    return state
}