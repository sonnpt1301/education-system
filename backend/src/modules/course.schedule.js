import schedule from 'node-schedule'
import { Course } from '../models/course.model.js'

const ON_EVERY_DAY = '0 0 0 * * *'
// const ON_EVERY_DAY = '*/15 * * * * *'

export default schedule.scheduleJob(ON_EVERY_DAY, () => {
    Course.updateMany({ 
        toDate: {
            $lt: new Date()
        }
    }, {
        status: 'accomplish'
    })
});

