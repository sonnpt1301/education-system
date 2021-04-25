import { UserCourse } from '../../models/user-course.model.js'
import { User } from '../../models/user.model.js'
import { Course } from '../../models/course.model.js'
import { mailer } from '../../common/mailer.js';
import { renderFile } from 'ejs'

export const requestToJoinCourseService = async (userId, courseId) => {
    const response = {
        statusCode: 200,
        message: 'Success',
        data: {}
    }
    try {
        const user = await User.findOne({ _id: userId })
        const course = await Course.findOne({ _id: courseId })
        if (!user) {
            return {
                statusCode: 404,
                message: 'User not found',
                data: {}
            }
        }
        if (!course) {
            return {
                statusCode: 404,
                message: 'Course not found',
                data: {}
            }
        }
        const body = await renderFile('src/views/join-course.template.ejs', {
            firstName: user.profile.firstName,
            courseName: course.title,
            secretKey: course.secretKey
        })

        await mailer({
            email: user.email,
            subject: 'Request to join course',
            content: body,
        });

    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }
    return response
}



export const joinCourseService = async (userId, courseId, secretKey) => {
    const response = {
        statusCode: 200,
        message: 'Join course successful',
        data: {}
    }
    try {
        const user = await User.findOne({ _id: userId })
        const course = await Course.findOne({ _id: courseId })
        if (!user) {
            return {
                statusCode: 404,
                message: 'User not found',
                data: {}
            }
        }
        if (!course) {
            return {
                statusCode: 404,
                message: 'Course not found',
                data: {}
            }
        }

        const checkUserOnCourse = await UserCourse.findOne({ user: userId, course: courseId })
        if (checkUserOnCourse) {
            return {
                statusCode: 400,
                message: 'Already joined course',
                data: {}
            }
        }

        if(secretKey !== course.secretKey){
            return {
                statusCode: 400,
                message: 'Wrong secret key',
                data: {}
            }
        }

        const joinCourse = await UserCourse.create({
            user: userId,
            course: courseId
        })
        response.data = joinCourse

    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }
    return response
}