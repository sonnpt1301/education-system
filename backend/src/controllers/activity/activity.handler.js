import { getDetailActivityService, getListActivitiesService, createActivityService, uploadFileService, downloadFileService } from './activity.process.js'


export const getDetailActivity = async (req, res) => {
    const { statusCode, message, data } = await getDetailActivityService(req.params.id)

    return res.status(statusCode).send({ statusCode, message, data })
}

export const getListActivities = async (req, res) => {
    const { statusCode, message, data } = await getListActivitiesService(req.params.id)

    return res.status(statusCode).send({ statusCode, message, data })
}

export const createActivity = async (req, res) => {
    const { statusCode, message, data } = await createActivityService(req.params.id, req.body, req.user)

    return res.status(statusCode).send({ statusCode, message, data })
}

export const uploadFile = async (req, res) => {
    const { statusCode, message, data } = await uploadFileService(req.params.id, req.files, req.user)

    return res.status(statusCode).send({ statusCode, message, data })
}

export const downloadFile = async (req, res) => {
    const { statusCode, message, data } = await downloadFileService(req.params.id, req.params.fileId);

    res.set({
        // zip
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename=${message}.zip`,
        'Content-Length': data.length,

        // prevent cache
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0
    });

    return res.status(statusCode).send(data);
}