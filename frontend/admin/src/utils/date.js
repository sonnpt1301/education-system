import moment from 'moment-timezone';

export const formatDate = (date) => moment(date).format('DD-MMM-YYYY');
