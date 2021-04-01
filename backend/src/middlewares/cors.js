export const allowCors = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type, Authorization, Accept, X-Access-Token, X-Key');

    return req.method == 'OPTIONS' ? res.status(200).end() : next();
};
