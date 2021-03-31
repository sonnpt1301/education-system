import AWS from 'aws-sdk';
import { AWS_ACCESS_BUCKET } from './enum.js';

const s3 = new AWS.S3(AWS_ACCESS_BUCKET);

export const uploadAWS = (bucket, key, buffer) => {
    return new Promise((resolve, reject) => {
        s3.upload({
            client: s3,
            Bucket: bucket,
            Key: key,
            Body: buffer,
        }, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

export const downloadAWS = (bucket, key) => {
    return new Promise((resolve, reject) => {
        s3.getObject({
            Bucket: bucket,
            Key: key,
        }, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};
