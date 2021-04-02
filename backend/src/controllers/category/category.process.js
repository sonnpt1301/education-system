import { Category } from '../../models/category.model.js'

export const getListCategoryService = async (filter = {}) => {
    const response = {
        statusCode: 200,
        message: 'Showing list category',
        data: {}
    }
    try {
        const total = await Category.countDocuments({
            ...filter,
            isDeleted: false
        })
        const categories = await Category.find({
            ...filter, isDeleted: false
        })
        const category = await Category.populate(categories, { path: 'createdBy', select: 'email profile' })
        response.data = { total, category }
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }
    return response
}

export const createCategoryService = async (data, currentUser) => {
    const response = {
        statusCode: 201,
        message: 'Create category successfully',
        data: {}
    }
    try {
        const category = await Category.findOne({ name: data.name })
        if (category) {
            if (category.isDeleted) {
                const result = await Category.findOneAndUpdate({ _id: category._id }, { isDeleted: false });
                response.data = result

                return response
            } else {
                return {
                    statusCode: 400,
                    message: 'Category existed',
                    data: {},
                }
            }
        }

        const newCategory = await Category.create({
            name: data.name,
            createdBy: currentUser._id
        })

        response.data = await Category.populate(newCategory, { path: 'createdBy', select: 'email profile' })
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }
    return response
}

export const updateCategoryService = async ({ categoryId, data }) => {
    const response = {
        statusCode: 200,
        message: 'Update category successful',
        data: {}
    };

    try {
        const category = await Category.findOne({ _id: categoryId });
        if (!category) {
            return {
                statusCode: 404,
                message: 'Category not existed',
                data: {}
            };
        }

        if (data.name) {
            const checkCategory = await Category.findOne({
                _id: { $ne: category._id },
                name: data.name,
            });

            if (checkCategory) {
                return {
                    statusCode: 400,
                    message: 'Category name existed',
                    data: {}
                };
            }
        }

        const newCategory = await Category.findOneAndUpdate({ _id: categoryId }, data, { new: true });

        response.data = await Category.populate(newCategory, { path: 'createdBy', select: 'email profile' });
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const deleteCategoryService = async ({ categoryId }) => {
    const response = {
        statusCode: 200,
        message: 'Delete category successful',
        data: {}
    };

    try {
        const category = await Category.findOneAndUpdate({ _id: categoryId }, { isDeleted: true }, { new: true });
        if (!category) {
            return {
                statusCode: 404,
                message: 'Category not existed',
                data: {}
            };
        }

        response.data = await Category.populate(category, { path: 'createdBy', select: 'email profile' });
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};