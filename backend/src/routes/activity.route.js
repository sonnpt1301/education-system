import express from 'express';
import multer from 'multer';

import { validateRequest, validateRole, verifyToken } from '../middlewares/index.js';
import * as activityValidator from '../controllers/activity/activity.validator.js';
import * as activityController from '../controllers/activity/activity.handler.js';

const router = express.Router();

export default (prefix) => {
    prefix.use('/activities', verifyToken, router);

    router.get('/:id', activityController.getListActivities)
    router.post('/:id', validateRole(['tutors']), activityValidator.createActivity, validateRequest, activityController.createActivity)
    router.post('/:id/upload-file', multer({}).array('files'), activityController.uploadFile)
    router.get('/:id/activity-detail', activityController.getDetailActivity)
    router.get('/:id/files/:fileId', activityController.downloadFile);
};
