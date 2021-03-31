import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users',
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const Category = mongoose.model('categories', CategorySchema);
