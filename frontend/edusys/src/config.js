export const API_CONFIG = {
    END_POINT: process.env.REACT_APP_END_POINT,
    PREFIX: process.env.REACT_APP_PREFIX,
};

export const AWS_END_POINT = 'https://s3-ap-southeast-1.amazonaws.com/';
export const BUCKET = 'edusys-project';

export const AWS_FOLDER = {
    IMAGE: AWS_END_POINT + BUCKET + '/image/',
    FILE: AWS_END_POINT + BUCKET + '/file/',
    VIDEO: AWS_END_POINT + BUCKET + '/video/',
};
