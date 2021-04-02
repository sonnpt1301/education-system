/* eslint-disable import/no-anonymous-default-export */
import { categoryConstants } from '../actions/constants'

const initState = {
    categoryList: [],
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
        case categoryConstants.GET_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.GET_CATEGORIES_SUCCESS:
            state = {
                ...state,
                loading: false,
                categoryList: action.payload
            }
            break;
        case categoryConstants.GET_CATEGORIES_FAILURE:
            state = {
                ...state,
                error: action.payload
            }
            break;
        case categoryConstants.ADD_CATEGORY_REQUEST:
            state = {
                ...state,
                loadingCreate: true
            }
            break;
        case categoryConstants.ADD_CATEGORY_SUCCESS:
            state = {
                ...state,
                loadingCreate: false
            }
            break;
        case categoryConstants.ADD_CATEGORY_FAILURE:
            state = {
                ...state,
                loadingCreate: false,
                errorCreate: action.payload
            }
            break;
        case categoryConstants.UPDATE_CATEGORY_REQUEST:
            state = {
                ...state,
                loadingUpdate: true
            }
            break;
        case categoryConstants.UPDATE_CATEGORY_SUCCESS:
            state = {
                ...state,
                loadingUpdate: false
            }
            break;
        case categoryConstants.UPDATE_CATEGORY_FAILURE:
            state = {
                ...state,
                errorUpdate: action.payload,
                loadingUpdate: false
            }
            break;
        case categoryConstants.DELETE_CATEGORY_REQUEST:
            state = {
                ...state,
                loadingDelete: true,
            }
            break;
        case categoryConstants.DELETE_CATEGORY_SUCCESS:
            state = {
                ...state,
                loadingDelete: false
            }
            break;
        case categoryConstants.DELETE_CATEGORY_FAILURE:
            state = {
                ...state,
                errorDelete: action.payload,
                loadingDelete: false
            }
            break;
    }
    return state
}