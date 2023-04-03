function errorHandlerMiddleware(err, req, res, next) {
    console.error(err);
    res.status(500).send({ error: 'Internal Server Error' });
}

module.exports = errorHandlerMiddleware;
