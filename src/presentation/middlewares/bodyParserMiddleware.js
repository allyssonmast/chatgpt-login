
const bodyParser = require('body-parser');

function bodyParserMiddleware() {
    return bodyParser.json();
}

module.exports = bodyParserMiddleware;
