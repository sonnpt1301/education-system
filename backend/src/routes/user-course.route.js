import express from 'express';
import multer from 'multer';
import { validateRequest, validateRole, verifyToken } from '../middlewares/index.js';
import * as userCourseController from '../controllers/user-course/user-course.handler.js';
import * as userCourseValidator from '../controllers/user-course/user-course.validator.js';
const router = express.Router();

export default (prefix) => {
    prefix.use('/user-course', verifyToken, validateRole(['student']), router);

    router.post('/send-request', userCourseController.requestToJoinCourse)
    router.post('/join-course', userCourseValidator.joinCourse, validateRequest, userCourseController.joinCourse)
};
