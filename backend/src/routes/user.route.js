import express from 'express';
import multer from 'multer';

import { validateRequest, validateRole, verifyToken } from '../middlewares/index.js';
import * as userValidator from '../controllers/user/user.validator.js';
import * as userController from '../controllers/user/user.handler.js';

const router = express.Router();

export default (prefix) => {
    prefix.use('/users', router);

    router.put('/reset-password', userController.createPassword)
    router.get('/', verifyToken, userController.listUser);
    router.post('/', verifyToken, userValidator.createUser, validateRequest, userController.createUser);
    router.put('/:id', verifyToken, userController.updateUser);
    router.delete('/:id', verifyToken, validateRole(['admin']), userController.deleteUser);

    router.put('/:id/avatar', verifyToken, multer({}).single('avatar'), userController.uploadAvatar);
    router.post('/forgotPassword', userController.forgotPassword)
};
