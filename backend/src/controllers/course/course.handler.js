import { getCourseService, createCourseService, deleteCourseService, listCourseService, updateCourseService } from './course.process.js'
import { queryBuilder } from './course.validator.js'

export const getCourse = async (req, res) => {
    const { statusCode, message, data } = await getCourseService(req.params.id, req.user)

    return res.status(statusCode).send({ statusCode, message, data })
}

export const listCourse = async (req, res) => {
    const query = queryBuilder(req.query)
    const limit = parseInt(req.query.limit, 10) || 10
    const skip = parseInt(req.query.skip, 10) || 0
    const { statusCode, message, data } = await listCourseService(query, limit, skip)

    return res.status(statusCode).send({ statusCode, message, data })
}

export const createCourse = async (req, res) => {
    const { statusCode, message, data } = await createCourseService(req.body, req.user)

    return res.status(statusCode).send({ statusCode, message, data })
}

export const updateCourse = async (req, res) => {
    const { statusCode, message, data } = await updateCourseService(req.params.id, req.body, req.user)

    return res.status(statusCode).send({ statusCode, message, data })
}

export const deleteCourse = async (req, res) => {
    const { statusCode, message, data } = await deleteCourseService(req.params.id)

    return res.status(statusCode).send({ statusCode, message, data })
}



