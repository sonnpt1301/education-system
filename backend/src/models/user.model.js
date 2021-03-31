import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    passwordResetToken: {
        type: String,
        default: null
    },
    profile: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        role: {
            type: String,
            enum: ['admin', 'student', 'tutors'],
            default: 'student',
        },
        city: String,
        address: String,
        phone: String,
        avatar: {
            type: String,
            default: 'default_avatar.jpg',
        },
    },
}, { timestamps: true });

UserSchema.pre('save', async function save(next) {
    try {
        if (this.isModified('password')) {
            const salt = await bcrypt.genSalt(10);
            this.password = bcrypt.hashSync(this.password, salt);
        }

        return next();
    } catch (err) {
        return next(err);
    }
});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

export const User = mongoose.model('users', UserSchema);
