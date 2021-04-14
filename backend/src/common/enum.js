export const AWS_ACCESS_BUCKET = {
    endpoint: process.env.AWS_END_POINT,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

export const EDUSYS_BUCKET = 'edusys-project';

export const AWS_FOLDER = {
    IMAGE: 'image/',
    FILE: 'file/',
    VIDEO: 'video/',
};

export const SMTP_CONFIG = {
    HOST: process.env.SMTP_HOST,
    PORT: process.env.SMTP_PORT,
    SERVICE: process.env.SMTP_SERVICE,
    SECURE: true,
    AUTH: {
        USER: process.env.SMTP_USER,
        PASS: process.env.SMTP_PASS,
    },
};

export const MAILER_FROM = `Education System <${process.env.SMTP_USER_NO_REPLY}>`;