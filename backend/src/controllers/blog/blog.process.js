import { Blog } from '../../models/blog.model.js'
import { Course } from '../../models/course.model.js'
import { Comment } from '../../models/comment.model.js'
import { sanitizeUpdateData } from './blog.validator.js'
import { downloadAWS, uploadAWS } from '../../common/aws.js';
import { AWS_FOLDER, EDUSYS_BUCKET } from '../../common/enum.js';
import md5 from 'md5';
import mongoDb from 'mongodb'
import { zipFile } from '../../utils/index.js'

export const getBlogService = async (blogId) => {
    const response = {
        statusCode: 200,
        message: 'Showing blog successful',
        data: {},
    };

    try {
        const blog = await Blog.findOne({
            _id: blogId,
            isDeleted: false,
        })
            .populate({ path: 'course', select: 'title' })
            .populate({ path: 'createdBy', select: 'email profile.firstName profile.lastName profile.avatar' })
            .lean();
        if (!blog) {
            return {
                statusCode: 404,
                message: 'Blog not found',
                data: {},
            };
        }

        const comments = await Comment.find({ blog: blog._id })
            .populate({ path: 'user', select: 'email profile.firstName profile.lastName profile.avatar' })
            .lean();
        console.log(comments)

        response.data = {
            ...blog,
            comments
        };
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const listBlogService = async (filter = {}, limit, skip) => {
    const response = {
        statusCode: 200,
        message: 'Showing list blog successful',
        data: {},
    };

    try {
        const total = await Blog.countDocuments({
            ...filter,
            isDeleted: false,
        });
        const blogs = await Blog.find({
            ...filter,
            isDeleted: false,
        })
            .populate({ path: 'course', select: 'title' })
            .populate({ path: 'createdBy', select: 'email profile.firstName profile.lastName profile.avatar' })
            .limit(limit)
            .skip(skip)
            .lean();

        // const addComment = blogs.map(async (blog) => {
        //     const comments = await Comment.find({ blog: blog._id })
        //         .sort({ updatedAt: -1 })
        //         .populate({ path: 'user', select: 'email profile.firstName profile.lastName profile.avatar' })
        //         .select('user')
        //         .limit(5)
        //         .lean();

        //     return {
        //         ...blog,
        //         comments
        //     };
        // });

        // const mappingComment = await Promise.all(addComment);
        // response.data = {
        //     total,
        //     limit,
        //     skip,
        //     totalPage: Math.ceil(total / limit),
        //     data: mappingComment,
        // };
        response.data = { blogs, total, limit, skip }
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const createBlogService = async (data, currentUser) => {
    const response = {
        statusCode: 201,
        message: 'Create blog successfully',
        data: {}
    }
    try {
        // check course existed
        const course = await Course.findOne({ _id: data.course })
        if (!course) {
            return {
                statusCode: 404,
                message: 'Course not found',
                data: {}
            }
        }


        const blog = await Blog.create({
            title: data.title,
            content: data.content,
            course: data.course,
            createdBy: currentUser._id,
            status: currentUser.profile.role === 'tutors' ? 'approve' : 'pending'
        })

        response.data = await blog
            .populate({ path: 'course', select: 'title' })
            .populate({ path: 'createdBy', select: 'email profile.firstName profile.lastName profile.avatar' })
            .execPopulate()
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }
    return response
}

export const updateBlogService = async (blogId, data) => {
    const response = {
        statusCode: 200,
        message: 'Update blog successful',
        data: {},
    };

    try {
        const updateData = sanitizeUpdateData(data);
        if (updateData.course) {
            // check exist course
            const course = await Course.findOne({
                _id: updateData.course,
                isDeleted: false,
            });
            if (!course) {
                return {
                    statusCode: 404,
                    message: 'Course not found',
                    data: {},
                };
            }
        }

        const blog = await Blog.findOneAndUpdate({ _id: blogId, isDeleted: false }, updateData, { new: true })
            .populate({ path: 'course', select: 'title' })
            .populate({ path: 'createdBy', select: 'email profile.firstName profile.lastName profile.avatar' })
        if (!blog) {
            return {
                statusCode: 404,
                message: 'Blog not found',
                data: {},
            };
        }

        response.data = blog;

    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
}

export const deleteBlogService = async (blogId) => {
    const response = {
        statusCode: 200,
        message: 'Delete blog successful',
        data: {},
    };

    try {
        const blog = await Blog.findOneAndUpdate({ _id: blogId, isDeleted: false }, {
            isDeleted: true,
        }, { new: true })
            .populate({ path: 'course', select: 'title' })
            .populate({ path: 'createdBy', select: 'email profile.firstName profile.lastName profile.avatar' })
        if (!blog) {
            return {
                statusCode: 404,
                message: 'Blog not found',
                data: {},
            };
        }

        response.data = blog;
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
}


export const uploadBlogBgImgService = async (blogId, file) => {
    const response = {
        statusCode: 200,
        message: 'Upload Blog background image successful',
        data: {},
    };

    try {
        const blog = await Blog.findOne({ _id: blogId, isDeleted: false })
            .populate({ path: 'course', select: 'title' })
            .populate({ path: 'createdBy', select: 'email profile.firstName profile.lastName profile.avatar' })
        if (!blog) {
            return {
                statusCode: 404,
                message: 'Blog not found',
                data: {},
            };
        }

        blog.bgImage = `${md5(Date.now())}.${md5(file.buffer)}.${file.originalname.split('.').pop()}`;
        await uploadAWS(EDUSYS_BUCKET, `${AWS_FOLDER.IMAGE}${blog.bgImage}`, file.buffer);


        response.data = await blog.save();
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const uploadBlogFileService = async (blogId, files) => {
    const response = {
        statusCode: 200,
        message: 'Upload blog files successful',
        data: {},
    };

    try {
        const blog = await Blog.findOne({ _id: blogId, isDeleted: false });
        if (!blog) {
            return {
                statusCode: 404,
                message: 'Blog not found',
                data: {},
            };
        }

        const uploadFileProcess = files.map(async (file) => {
            const filePath = `${md5(Date.now())}.${md5(file.buffer)}.${file.originalname.split('.').pop()}`;
            await uploadAWS(EDUSYS_BUCKET, `${AWS_FOLDER.FILE}${filePath}`, file.buffer);
            await Blog.updateOne({ _id: blogId, isDeleted: false }, {
                $push: {
                    files: {
                        fileName: file.originalname,
                        filePath,
                    },
                },
            });
        });

        await Promise.all(uploadFileProcess);

        const newBlog = await Blog.findOne({ _id: blogId, isDeleted: false })
            .populate({ path: 'course', select: 'title' })
            .populate({ path: 'createdBy', select: 'email profile.firstName profile.lastName profile.avatar' })

        response.data = newBlog;
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const downloadFileService = async (blogId, fileId) => {
    const response = {
        statusCode: 200,
        message: 'Download file successful',
        data: {}
    }
    try {
        const file = await Blog.aggregate([
            {
                $match: {
                    _id: new mongoDb.ObjectId(blogId)
                }
            },
            {
                $project: {
                    _id: 0,
                    files: 1
                }
            },
            {
                $unwind: '$files'
            },
            {
                $match: {
                    'files._id': new mongoDb.ObjectId(fileId)
                }
            }
        ]);

        if (!file[0].files) {
            return {
                statusCode: 404,
                message: 'File not found',
                data: {},
            };
        }

        const downloadFile = await downloadAWS(EDUSYS_BUCKET, `${AWS_FOLDER.FILE}${file[0].files.filePath}`);

        response.message = file[0].files.fileName;
        response.data = zipFile(file[0].files.fileName, downloadFile.Body);

    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }
    return response
}
