import { combineReducers } from 'redux'
import authReducer from './auth.reducer'
import userReducer from './user.reducer'
import categoryReducer from './category.reducer'
import courseReducer from './course.reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    course: courseReducer,
})

export default rootReducer