import { renderFile } from 'ejs'
import { v4 as uuidv4 } from 'uuid'
import { mailer } from '../../common/mailer.js'
import { Category } from '../../models/category.model.js'
import { Course } from '../../models/course.model.js'
import { User } from '../../models/user.model.js'
import { Video } from '../../models/video.model.js'
import { UserCourse } from '../../models/user-course.model.js'
import { sanitizeUpdateData } from './course.validator.js'
import md5 from 'md5';
import { downloadAWS, uploadAWS } from '../../common/aws.js';
import { AWS_FOLDER, EDUSYS_BUCKET } from '../../common/enum.js';



export const getCourseService = async (courseId, user = {}) => {
    const response = {
        statusCode: 200,
        message: 'Showing course successful',
        data: {},
    };

    try {
        const checkUser = await UserCourse.findOne({
            course: courseId,
            user: user._id,
        })
        if (user.profile.role === 'student') {
            if (!checkUser) {
                return {
                    statusCode: 404,
                    message: `You haven't join this course`,
                    data: {},
                }
            }
        }

        const course = await Course.findOne({
            _id: courseId,
            isDeleted: false,
        })
            .populate({ path: 'createdBy', select: 'email profile.firstName profile.lastName profile.avatar' })
            .populate({ path: 'category', select: 'name' })
            .lean();

        const videos = await Video.find({ course: course._id })
            .populate({ path: 'createdBy', select: 'email profile.firstName profile.lastName profile.avatar' })
            .lean()

        // List user in the course
        const listUserInCourse = await UserCourse.find({ course: course._id })
            .populate({ path: 'user', select: 'email profile.firstName profile.lastName profile.avatar' })

        const totalUserInCourse = await UserCourse.countDocuments({ course: course._id })

        if (!course) {
            return {
                statusCode: 404,
                message: 'Course not found',
                data: {},
            };
        }

        response.data = { ...course, totalUserInCourse, listUserInCourse, videos }
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const listCourseService = async (filter = {}, limit, skip) => {
    const response = {
        statusCode: 200,
        message: 'Showing list course successful',
        data: {},
    }
    try {
        const total = await Course.countDocuments({
            ...filter,
            isDeleted: false
        })
        const courses = await Course.find({
            ...filter,
            isDeleted: false
        })
            .populate({ path: 'createdBy', select: 'email profile.firstName profile.lastName profile.avatar' })
            .populate({ path: 'category', select: 'name' })
            .limit(limit)
            .skip(skip)
            .lean()

        const addTotalUser = courses.map(async (course) => {
            const totalUser = await UserCourse.countDocuments({ course: course._id })
            return {
                ...course,
                totalUser,
            }
        })
        const test = await Promise.all(addTotalUser)

        const statisticCourse = await Course.aggregate([
            { $match: { ...filter } },
            { $lookup: { from: 'categories', localField: 'category', foreignField: '_id', as: 'category_info' } },
            { $unwind: '$category_info' },
            {
                $group: {
                    _id: { category: '$category', 'categoryName': '$category_info.name' }, count: { $sum: 1 },
                }
            },
            { $sort: { 'count': -1 } },
        ])

        response.data = {
            total,
            limit,
            skip,
            totalPage: Math.ceil(total / limit),
            data: test,
            statisticCourse
        }
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }
    return response
}

export const createCourseService = async (data, currentUser) => {
    const response = {
        statusCode: 201,
        message: 'Create course successful',
        data: {},
    }
    try {
        // check exist category
        const category = await Category.findOne({
            _id: data.category,
            isDeleted: false
        })

        if (!category) {
            return {
                statusCode: 404,
                message: 'Category not found',
                data: {},
            }
        }

        // check exist course
        const checkCourse = await Course.findOne({ title: data.title, isDeleted: false })
        if (checkCourse) {
            return {
                statusCode: 400,
                message: 'Course existed',
                data: {}
            }
        }

        const course = await Course.create({
            title: data.title,
            description: data.description,
            fromDate: data.fromDate,
            toDate: data.toDate,
            category: data.category,
            createdBy: currentUser._id,
            secretKey: uuidv4()
        })

        response.data = await course
            .populate({ path: 'createdBy', select: 'email profile.firstName profile.lastName profile.avatar' })
            .populate({ path: 'category', select: 'name' })
            .execPopulate()

    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }
    return response
}

export const updateCourseService = async (courseId, data, currentUser) => {
    const response = {
        statusCode: 200,
        message: 'Update course successful',
        data: {},
    }
    try {
        const updateData = sanitizeUpdateData(data);

        // check exist category
        if (updateData.category) {
            const category = await Category.findOne({
                _id: updateData.category,
                isDeleted: false
            })

            if (!category) {
                return {
                    statusCode: 404,
                    message: 'Category not found',
                    data: {},
                }
            }
        }

        const course = await Course.findOneAndUpdate(
            { _id: courseId, isDeleted: false },
            updateData,
            { new: true })
            .populate({ path: 'createdBy', select: 'email profile.firstName profile.lastName profile.avatar' })
            .populate({ path: 'category', select: 'name' })

        const videos = await Video.find({ course: course._id })
            .populate({ path: 'createdBy', select: 'email profile.firstName profile.lastName profile.avatar' })
            .lean()

        // List user in the course
        const listUserInCourse = await UserCourse.find({ course: course._id })
            .populate({ path: 'user', select: 'email profile.firstName profile.lastName profile.avatar' })

        const totalUserInCourse = await UserCourse.countDocuments({ course: course._id })

        if (!course) {
            return {
                statusCode: 404,
                message: 'Course not found',
                data: {}
            }
        }
        if (course.status === 'on process' && currentUser.profile.role === 'admin') {

            const users = await User.find({
                _id: { $ne: currentUser._id },
                isDeleted: false,
                'profile.role': 'student',
            })

            const body = await renderFile('src/views/create-course.template.ejs', {
                course_name: course.title,
                category: course.category.name
            })

            await mailer({
                email: users.map(({ email }) => email),
                subject: 'New Course',
                content: body,
            });
        }

        response.data = { ...course, videos, listUserInCourse, totalUserInCourse }
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response
}

export const deleteCourseService = async (courseId) => {
    const response = {
        statusCode: 200,
        message: 'Delete course successful',
        data: {},
    };

    try {
        const course = await Course.findOneAndUpdate({ _id: courseId, isDeleted: false }, {
            isDeleted: true,
        }, { new: true })
            .populate({ path: 'createdBy', select: 'email profile.firstName profile.lastName profile.avatar' })
            .populate({ path: 'category', select: 'name' })
        if (!course) {
            return {
                statusCode: 404,
                message: 'Course not found',
                data: {},
            };
        }

        response.data = course;
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};


export const uploadCourseBgImgService = async (courseId, file) => {
    const response = {
        statusCode: 200,
        message: 'Upload Course background image successful',
        data: {},
    };

    try {
        const course = await Course.findOne({ _id: courseId, isDeleted: false })
            .populate({ path: 'category', select: 'name' })
            .populate({ path: 'createdBy', select: 'email profile.firstName profile.lastName profile.avatar' })
        if (!course) {
            return {
                statusCode: 404,
                message: 'Course not found',
                data: {},
            };
        }

        course.bgImage = `${md5(Date.now())}.${md5(file.buffer)}.${file.originalname.split('.').pop()}`;
        await uploadAWS(EDUSYS_BUCKET, `${AWS_FOLDER.IMAGE}${course.bgImage}`, file.buffer);


        response.data = await course.save();
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
}

export const uploadVideoService = async (courseId, data, file, currentUser) => {
    const response = {
        statusCode: 201,
        message: 'Upload video course successfully',
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
        const checkVideo = await Video.findOne({ name: data.name })

        if (checkVideo) {
            return {
                statusCode: 400,
                message: 'The video name has already been existed',
                data: {}
            }
        }

        const video = await Video.create({
            name: data.name,
            course: courseId,
            createdBy: currentUser._id,
        })

        video.file = `${md5(Date.now())}.${md5(file.buffer)}.${file.originalname.split('.').pop()}`
        await uploadAWS(EDUSYS_BUCKET, `${AWS_FOLDER.VIDEO}${video.file}`, file.buffer)

        await video.save()

        response.data = await video
            .populate({ path: 'course', select: 'title' })
            .populate({ path: 'createdBy', select: 'email profile.firstName profile.lastName profile.avatar' })
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }
    return response
}
