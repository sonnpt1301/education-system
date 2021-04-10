/* eslint-disable import/no-anonymous-default-export */
import { blogConstants } from '../actions/constants'

const initState = {
    blogList: [],
    blogDetail: {},
    loadingBlogDetail: false,
    errorBlogDetail: null,
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
        case blogConstants.GET_BLOG_DETAIL_REQUEST:
            state = {
                ...state,
                loadingBlogDetail: true
            }
            break;
        case blogConstants.GET_BLOG_DETAIL_SUCCESS:
            state = {
                ...state,
                loadingBlogDetail: false,
                blogDetail: action.payload,
                errorBlogDetail: null,
            }
            break;
        case blogConstants.GET_BLOG_DETAIL_FAILURE:
            state = {
                ...state,
                errorBlogDetail: action.payload,
                loadingBlogDetail: false
            }
            break;
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
        case blogConstants.UPDATE_BLOG_REQUEST:
            state = {
                ...state,
                loadingUpdate: true
            }
            break;
        case blogConstants.UPDATE_BLOG_SUCCESS:
            state = {
                ...state,
                loadingUpdate: false,
                errorUpdate: null
            }
            break;
        case blogConstants.UPDATE_BLOG_FAILURE:
            state = {
                ...state,
                errorUpdate: action.payload,
                loadingUpdate: false
            }
            break;
        case blogConstants.DELETE_BLOG_REQUEST:
            state = {
                ...state,
                loadingDelete: true
            }
            break;
        case blogConstants.DELETE_BLOG_SUCCESS:
            state = {
                ...state,
                loadingDelete: false,
                errorDelete: null
            }
            break;
        case blogConstants.DELETE_BLOG_FAILURE:
            state = {
                ...state,
                errorDelete: action.payload,
                loadingDelete: false
            }
            break;
    }
    return state
}