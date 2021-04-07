import {
    createCategoryService,
    getListCategoryService,
    updateCategoryService,
    deleteCategoryService,
} from './category.process.js';
import { queryBuilder } from './category.validator.js'


export const getListCategory = async (req, res) => {
    const query = queryBuilder(req.query)
    const limit = parseInt(req.query.limit, 10) || 10
    const skip = parseInt(req.query.skip, 10) || 0
    const { statusCode, message, data } = await getListCategoryService(query, limit, skip);

    return res.status(statusCode).send({ statusCode, message, data });
};

export const createNewCategory = async (req, res) => {
    const { statusCode, message, data } = await createCategoryService(req.body, req.user);

    return res.status(statusCode).send({ statusCode, message, data });
};

export const updateCategory = async (req, res) => {
    const { statusCode, message, data } = await updateCategoryService({ categoryId: req.params.id, data: req.body });

    return res.status(statusCode).send({ statusCode, message, data });
};

export const deleteCategory = async (req, res) => {
    const { statusCode, message, data } = await deleteCategoryService({ categoryId: req.params.id, data: req.body });

    return res.status(statusCode).send({ statusCode, message, data });
};
