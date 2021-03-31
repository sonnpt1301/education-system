import nodemailer from 'nodemailer';
import { SMTP_CONFIG, MAILER_FROM } from './enum.js';

const transporter = nodemailer.createTransport({
    host: SMTP_CONFIG.HOST,
    port: SMTP_CONFIG.PORT,
    secure: SMTP_CONFIG.SECURE,
    service: SMTP_CONFIG.SERVICE,
    auth: {
        user: SMTP_CONFIG.AUTH.USER,
        pass: SMTP_CONFIG.AUTH.PASS,
    },
});

export const mailer = ({ email, subject, content }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await transporter.sendMail({
                from: MAILER_FROM,
                to: email,
                subject,
                html: content,
            });
            return resolve(data);
        } catch (error) {
            return reject(error);
        }
    });
};
