import { Blog } from '../../models/blog.model.js';
import { Comment } from '../../models/comment.model.js';

export const listCommentService = async (filter = {}) => {
    const response = {
        statusCode: 200,
        message: 'Showing list comment of blog successful',
        data: {},
    };

    try {
        const blog = await Blog.findById(filter.blog);
        if (!blog) {
            return {
                statusCode: 404,
                message: 'Blog not found',
                data: {},
            };
        }

        const comments = await Comment.find({ blog: filter.blog })
            .sort({ updatedAt: -1 })
            .populate({
                path: 'user',
                select: 'email profile.firstName profile.lastName profile.avatar'
            });

        response.data = comments;
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const createCommentService = async (data, currentUser) => {
    const response = {
        statusCode: 200,
        message: 'Create comment successful',
        data: {},
    };

    try {
        const blog = await Blog.findOne({ _id: data.blog });
        if (!blog) {
            return {
                statusCode: 404,
                message: 'Blog not found',
                data: {},
            };
        }

        const comment = await Comment.create({
            content: data.content,
            user: currentUser._id,
            blog: data.blog
        });

        response.data = await comment.populate({ path: 'user', select: 'email profile.firstName profile.lastName profile.avatar' }).execPopulate();
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};
