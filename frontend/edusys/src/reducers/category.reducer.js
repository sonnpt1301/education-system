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
    }
    return state
}