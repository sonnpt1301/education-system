import schedule from 'node-schedule'
import { Course } from '../models/course.model.js'

const ON_EVERY_DAY = '0 0 0 * * *'
// const ON_EVERY_DAY = '*/15 * * * * *'

export const updateCourseStatus = schedule.scheduleJob(ON_EVERY_DAY, async () => {
    await Course.updateMany({
        toDate: {
            $lt: new Date()
        }
    }, {
        status: 'accomplish'
    }, { new: true })
});

