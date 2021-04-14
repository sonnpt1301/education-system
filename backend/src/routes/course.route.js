import express from 'express';
import multer from 'multer';
import { validateRequest, validateRole, verifyToken } from '../middlewares/index.js';
import * as courseController from '../controllers/course/course.handler.js';
import * as courseValidator from '../controllers/course/course.validator.js';
const router = express.Router();

export default (prefix) => {
    prefix.use('/courses', verifyToken, router);

    router.get('/', courseController.listCourse)
    router.get('/:id', courseController.getCourse)
    router.post('/', validateRole(['tutors']), courseValidator.createCourse, courseController.createCourse)
    router.put('/:id', validateRole(['tutors', 'admin']), courseController.updateCourse)
    router.delete('/:id', validateRole(['tutors', 'admin']), courseController.deleteCourse)
    router.post('/:id/bg-image', multer({}).single('bgImage'), courseController.uploadCourseBgImg)
    router.post('/:id/upload-video', multer({}).single('file'), courseController.uploadVideo)
};
