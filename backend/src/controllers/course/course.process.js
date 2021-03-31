import { renderFile } from 'ejs'
import { v4 as uuidv4 } from 'uuid'
import { mailer } from '../../common/mailer.js'
import { Category } from '../../models/category.model.js'
import { Course } from '../../models/course.model.js'
import { listUserService } from '../user/user.process.js'
import { sanitizeUpdateData } from './course.validator.js'


export const getCourseService = async (courseId) => {
    const response = {
        statusCode: 200,
        message: 'Showing course successful',
        data: {},
    };

    try {
        const course = await Course.findOne({
            _id: courseId,
            isDeleted: false,
        })
            .populate({ path: 'createdBy', select: 'email profile.firstName profile.lastName profile.avatar' })
            .populate({ path: 'category', select: 'name' })
            .lean();

        if (!course) {
            return {
                statusCode: 404,
                message: 'Course not found',
                data: {},
            };
        }

        response.data = course
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
            .sort({ updatedAt: -1 })
            .limit(limit)
            .skip(skip)
            .lean()

        response.data = {
            total,
            courses
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

export const updateCourseService = async (courseId, data) => {
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
        if (!course) {
            return {
                statusCode: 404,
                message: 'Course not found',
                data: {}
            }
        }
        if (course.status === 'on process') {

            const users = await listUserService()

            const sendEmailForAllUser = users.data.data.filter(usr => usr.profile.role === 'student').map(async (usr) => {
                const body = await renderFile('src/views/create-course.template.ejs', {
                    course_name: course.title,
                    category: course.category.name
                })

                await mailer({
                    email: usr.email,
                    subject: 'New Course',
                    content: body,
                });
            })

            await Promise.all(sendEmailForAllUser)
        }

        response.data = course
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