import createErrors from 'http-errors';

export const notFound = (_req, _res, next) => next(createErrors(404));

export const errorHandler = (err, req, res, _next) => {
    console.log(err);
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : '';

    return res.status(err.status || 500).send({
        statusCode: err.status || 500,
         message: err.stack,
         data: {}
    });
};
