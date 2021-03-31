import {
    createCategoryService,
    getListCategoryService,
    updateCategoryService,
    deleteCategoryService,
} from './category.process.js';

export const getListCategory = async (req, res) => {
    const { statusCode, message, data } = await getListCategoryService(req.query);

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
