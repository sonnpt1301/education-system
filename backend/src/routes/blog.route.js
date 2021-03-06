import express from 'express';
import multer from 'multer';

import { validateRequest, validateRole, verifyToken } from '../middlewares/index.js';
import * as blogValidator from '../controllers/blog/blog.validator.js';
import * as blogController from '../controllers/blog/blog.handler.js';

const router = express.Router();

export default (prefix) => {
    prefix.use('/blogs', verifyToken, validateRole(['tutors', 'student']), router)

    router.get('/:id', blogController.getBlog)
    router.get('/', blogController.listBlog)
    router.post('/', blogValidator.createBlog, validateRequest, blogController.createBlog)
    router.put('/:id', blogController.updateBlog)
    router.delete('/:id', blogController.deleteBlog)
    router.get('/:id/files/:fileId', blogController.downloadFile);
    router.post('/:id/bg-image', multer({}).single('bgImage'), blogController.uploadBlogBgImg)
    router.post('/:id/files', multer({}).array('files'), blogController.uploadBlogFile)
};
