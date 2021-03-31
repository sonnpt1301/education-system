import jwt from 'jsonwebtoken';

export const accessToken = (userId) => jwt.sign({ _id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
export const resetPasswordToken = (userId) => jwt.sign({ _id: userId }, process.env.JWT_SECRET, { expiresIn: '30m' });
