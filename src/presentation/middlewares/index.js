const authMiddleware = require('./authMiddleware')
const bodyParserMiddleware = require('./bodyParserMiddleware')
const errorHandlerMiddleware = require('./errorHandlerMiddleware')

module.exports = { authMiddleware, bodyParserMiddleware, errorHandlerMiddleware }