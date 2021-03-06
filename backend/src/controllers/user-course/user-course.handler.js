import { requestToJoinCourseService, joinCourseService, getUserCourseInfoService } from './user-course.process.js'


export const getUserCourseInfo = async (req, res) => {
    const { statusCode, message, data } = await getUserCourseInfoService(req.user)

    return res.status(statusCode).send({ statusCode, message, data })
}


export const requestToJoinCourse = async (req, res) => {
    const { statusCode, message, data } = await requestToJoinCourseService(req.user, req.body.courseId)

    return res.status(statusCode).send({ statusCode, message, data })
}

export const joinCourse = async (req, res) => {
    const { statusCode, message, data } = await joinCourseService(req.user, req.body.courseId, req.body.secretKey)

    return res.status(statusCode).send({ statusCode, message, data })
}

