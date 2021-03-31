import express from 'express'
import * as userController from '../controllers/user/user.handler.js'
import * as userValidator from '../controllers/user/user.validator.js'
import { validateRequest } from '../middlewares/index.js'
import userRoute from './user.route.js'
import categoryRoute from './category.route.js'
import courseRoute from './course.route.js'
import blogRoute from './blog.route.js'
import commentRoute from './comment.route.js'

const router = express.Router();
export default (app) => {
    app.use('/api', router)

    router.get('/', (_req, res) => res.send('Welcome to EduSys...'))

    // authentication
    router.post('/login', userValidator.login, validateRequest, userController.login)

    // routing to /users
    userRoute(router)

    // routing to /categories
    categoryRoute(router)

    // routing to /courses
    courseRoute(router)

    // routing to /blogs
    blogRoute(router)

    // routing to /comments
    commentRoute(router)
};