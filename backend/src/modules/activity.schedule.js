import schedule from 'node-schedule'
import { Activity } from '../models/activity.model.js'

// const ON_EVERY_DAY = '0 0 0 * * *'
const ON_EVERY_DAY = '*/15 * * * * *'

export const updateActivityStatus = schedule.scheduleJob(ON_EVERY_DAY, async () => {
    await Activity.updateMany({
        toDate: {
            $lt: new Date()
        }
    }, {
        status: 'outDate'
    }, { new: true })
});

