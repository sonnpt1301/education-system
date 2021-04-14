import md5 from 'md5';
import { uploadAWS } from '../../common/aws.js';
import { AWS_FOLDER, EDUSYS_BUCKET } from '../../common/enum.js';
import { User } from '../../models/user.model.js';
import { accessToken, resetPasswordToken } from '../../utils/index.js';
import { sanitizeUpdateData, sanitizeUserData } from './user.validator.js';
import { mailer } from '../../common/mailer.js';
import { renderFile } from 'ejs'

export const loginAuthentication = async ({ email, password }) => {
    const response = {
        statusCode: 200,
        message: 'Login successful',
        data: {},
    };

    try {
        const user = await User.findOne({ email });
        if (!user || !user.comparePassword(password)) {
            return {
                statusCode: 401,
                message: 'Wrong email or password',
                data: {},
            };
        }

        response.data = {
            user: sanitizeUserData(user),
            accessToken: accessToken(user._id),
        };
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const listUserService = async (filter = {}, limit, skip, currentUser) => {
    const response = {
        statusCode: 200,
        message: 'Listing users successful',
        data: {},
    };

    try {
        console.log(filter)
        const filterUserList = {
            ...filter,
            isDeleted: false,
            _id: {
                $ne: currentUser._id
            }
        };

        const total = await User.countDocuments(filterUserList);
        const users = await User.find(filterUserList)
            .limit(limit)
            .skip(skip);

        response.data = {
            total,
            limit,
            skip,
            totalPage: Math.ceil(total / limit),
            data: users,
        };
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const createUserService = async (data) => {
    const response = {
        statusCode: 200,
        message: 'Create new user successful',
        data: {},
    };

    try {
        const user = await User.findOne({ email: data.email });
        if (user) {
            return {
                statusCode: 400,
                message: 'User existed',
                data: { user },
            };
        }

        const createdData = {
            email: data.email,
            password: data.password,
            profile: {
                firstName: data.profile.firstName,
                lastName: data.profile.lastName,
                role: data.profile.role,
                city: data.profile.city,
                address: data.profile.address,
                phone: data.profile.phone,
            },
        };

        const newUser = new User(createdData);

        const body = await renderFile('src/views/create-user.template.ejs', {
            first_name: data.profile.firstName,
            email: data.email,
            password: data.password,
            button_link: process.env.FRONT_END_URL
        })

        await mailer({
            email: data.email,
            subject: 'Invitation to the Education system',
            content: body,
        });

        response.data = await newUser.save();

    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const updateUserService = async ({ userId, data }) => {
    const response = {
        statusCode: 200,
        message: 'Update user successful',
        data: {},
    };

    try {
        const updateData = sanitizeUpdateData(data);
        const user = await User.findOneAndUpdate({ _id: userId }, updateData, { new: true });
        if (!user) {
            return {
                statusCode: 404,
                message: 'User not found',
                data: {},
            };
        }

        response.data = user;
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const deleteUserService = async ({ userId }) => {
    const response = {
        statusCode: 200,
        message: 'Delete user successful',
        data: {},
    };

    try {
        const user = await User.findOneAndUpdate({ _id: userId }, {
            email: `DELETED_USER_${md5(Date.now())}`,
            profile: {
                firstName: 'DELETED',
                lastName: 'DELETED',
                avatar: 'default_avatar.jpg',
                city: '',
                address: '',
                phone: '',
            },
            isDeleted: true,
        }, { new: true });
        if (!user) {
            return {
                statusCode: 404,
                message: 'User not found',
                data: {},
            };
        }

        response.data = user;
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const uploadUserAvatar = async ({ userId, avatar }) => {
    const response = {
        statusCode: 200,
        message: 'Upload avatar successful',
        data: {},
    };

    try {
        const user = await User.findOne({ _id: userId }).select('email profile createdAt');
        if (!user) {
            return {
                statusCode: 404,
                message: 'User not found',
                data: {},
            };
        }

        // avatarPath: first-lastName.hash(date).mimetype
        user.profile.avatar = `${user.profile.firstName}-${user.profile.lastName}.${md5(Date.now())}.${avatar.originalname.split('.').pop()}`;
        await uploadAWS(EDUSYS_BUCKET, `${AWS_FOLDER.IMAGE}${user.profile.avatar}`, avatar.buffer);

        response.data = await user.save();
    } catch (err) {
        console.log(err);
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const forgotPasswordService = async ({ email }) => {
    const response = {
        statusCode: 200,
        message: 'Success',
        data: {},
    };
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return {
                statusCode: 404,
                message: 'User not found',
                data: {},
            };
        }

        const token = resetPasswordToken(user._id)
        user.passwordResetToken = token
        const body = await renderFile('src/views/reset-password.template.ejs', {
            first_name: user.profile.firstName,
            button_link: process.env.FRONT_END_URL + 'reset-password?token=' + token,
        })

        await mailer({
            email: email,
            subject: 'Reset Your Password',
            content: body,
        });

        await user.save()
        response.data = { state: true }
    } catch (err) {
        console.log(err);
        response.statusCode = 500;
        response.message = err.message;
    }

    return response
}

export const createPasswordService = async (data) => {
    const response = {
        statusCode: 200,
        message: 'Success',
        data: {},
    };
    try {
        const user = await User.findOne({ passwordResetToken: data.token })
        console.log(user)
        if (!user || data.token !== user.passwordResetToken) {
            return {
                statusCode: 404,
                message: 'Token not found',
                data: {},
            };
        }
        if (data.newPass.trim() !== data.confirmedPass.trim()) {
            return {
                statusCode: 404,
                message: 'Password do not match. Please double check your password and try again',
                data: {},
            };
        }

        user.password = data.newPass
        user.passwordResetToken = null
        await user.save()

        response.data = user
    } catch (err) {
        console.log(err);
        response.statusCode = 500;
        response.message = err.message;
    }
    return response
}

