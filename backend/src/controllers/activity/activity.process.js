import { Activity } from '../../models/activity.model.js'
import { Course } from '../../models/course.model.js'
import { downloadAWS, uploadAWS } from '../../common/aws.js';
import { AWS_FOLDER, EDUSYS_BUCKET } from '../../common/enum.js';
import md5 from 'md5';
import mongoDb from 'mongodb'
import { zipFile } from '../../utils/index.js'


export const getDetailActivityService = async (activityId) => {
    const response = {
        statusCode: 200,
        message: 'Showing detail activities successfully',
        data: {}
    }
    try {
        const activity = await Activity.findOne({ _id: activityId })
        if (!activity) {
            return {
                statusCode: 404,
                message: 'Activity not found',
                data: {}
            }
        }
        response.data = await activity
            .populate({ path: 'course', select: 'title' })
            .populate({ path: 'createdBy', select: 'email profile.firstName profile.lastName profile.avatar' })
            .populate({ path: 'files.createdBy', select: 'email profile.firstName profile.lastName avatar' })
            .execPopulate()
    } catch (err) {
        response.statusCode = 500
        response.message = err.message
    }
    return response
}

export const getListActivitiesService = async (courseId) => {
    const response = {
        statusCode: 200,
        message: 'Showing list activities successfully',
        data: {}
    }
    try {
        const activities = await Activity.find({ course: courseId })
            .populate({ path: 'course', select: 'title' })
            .populate({ path: 'createdBy', select: 'email profile.firstName profile.lastName profile.avatar' })
            .populate({ path: 'files.createdBy', select: 'email profile.firstName profile.lastName avatar' })

        response.data = activities
    } catch (err) {
        response.statusCode = 500
        response.message = err.message
    }
    return response
}

export const createActivityService = async (courseId, data, currentUser) => {
    const response = {
        statusCode: 201,
        message: 'Create activity successfully',
        data: {}
    }
    try {
        const course = await Course.findOne({ _id: courseId })
        if (!course) {
            return {
                statusCode: 404,
                message: 'Course not found',
                data: {}
            }
        }

        const activity = await Activity.create({
            name: data.name,
            description: data.description,
            fromDate: data.fromDate,
            toDate: data.toDate,
            course: courseId,
            createdBy: currentUser._id,
        })

        response.data = await activity
            .populate({ path: 'course', select: 'title' })
            .populate({ path: 'createdBy', select: 'email profile.firstName profile.lastName profile.avatar' })
            .populate({ path: 'files.createdBy', select: 'email profile.firstName profile.lastName avatar' })
            .execPopulate()

    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }
    return response
}

export const uploadFileService = async (activityId, files, currentUser) => {
    const response = {
        statusCode: 200,
        message: 'Showing list activities successfully',
        data: {}
    }
    try {
        const activity = await Activity.findOne({ _id: activityId })
        if (!activity) {
            return {
                statusCode: 404,
                message: 'Activity not found',
                data: {}
            }
        }
        const uploadFileProcess = files.map(async (file) => {
            const filePath = `${md5(Date.now())}.${md5(file.buffer)}.${file.originalname.split('.').pop()}`;
            await uploadAWS(EDUSYS_BUCKET, `${AWS_FOLDER.FILE}${filePath}`, file.buffer);
            await Activity.updateOne({ _id: activityId }, {
                $push: {
                    files: {
                        fileName: file.originalname,
                        filePath,
                        createdBy: currentUser._id
                    },
                },
            });
        });

        await Promise.all(uploadFileProcess);

        const data = await Activity.findOne({ _id: activityId })
            .populate({ path: 'course', select: 'title' })
            .populate({ path: 'createdBy', select: 'email profile.firstName profile.lastName profile.avatar' })
            .populate({ path: 'files.createdBy', select: 'email profile.firstName profile.lastName avatar' })

        response.data = data
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }
    return response
}

export const downloadFileService = async (activityId, fileId) => {
    const response = {
        statusCode: 200,
        message: 'Download file successful',
        data: {}
    }
    try {
        const file = await Activity.aggregate([
            {
                $match: {
                    _id: new mongoDb.ObjectId(activityId)
                }
            },
            {
                $project: {
                    _id: 0,
                    files: 1
                }
            },
            {
                $unwind: '$files'
            },
            {
                $match: {
                    'files._id': new mongoDb.ObjectId(fileId)
                }
            }
        ]);

        if (!file[0].files) {
            return {
                statusCode: 404,
                message: 'File not found',
                data: {},
            };
        }

        const downloadFile = await downloadAWS(EDUSYS_BUCKET, `${AWS_FOLDER.FILE}${file[0].files.filePath}`);

        response.message = file[0].files.fileName;
        response.data = zipFile(file[0].files.fileName, downloadFile.Body);

    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }
    return response
}