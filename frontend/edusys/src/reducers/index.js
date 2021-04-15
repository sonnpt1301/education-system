import { combineReducers } from 'redux'
import authReducer from './auth.reducer'
import courseReducer from './course.reducer'
import categoryReducer from './category.reducer'
import userReducer from './user.reducer'
import blogReducer from './blog.reducer'
import chatReducer from './chat.reducer'
import activityReducer from './activity.reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    course: courseReducer,
    category: categoryReducer,
    user: userReducer,
    blog: blogReducer,
    chat: chatReducer,
    activity: activityReducer,
})

export default rootReducer