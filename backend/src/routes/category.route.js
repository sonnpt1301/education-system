import express from 'express';
import multer from 'multer';

import { validateRequest, validateRole, verifyToken } from '../middlewares/index.js';
import * as categoryValidator from '../controllers/category/category.validator.js';
import * as categoryController from '../controllers/category/category.handler.js';

const router = express.Router();

export default (prefix) => {
    prefix.use('/categories', verifyToken, router);

    router.get('/', categoryController.getListCategory);
    router.post('/', validateRole(['admin']), categoryValidator.createCategory, validateRequest, categoryController.createNewCategory);
    router.put('/:id', validateRole(['admin']), categoryController.updateCategory);
    router.delete('/:id', validateRole(['admin']), categoryController.deleteCategory);
};
