

const express = require('express');

// As rotas não precisam saber das classes injetadas
function userRoutes(app, userController) {
    const router = express.Router();

    router.post('/login', userController.loginUser);
    router.post('/users', userController.createUser);
    router.get('/users/:id', userController.findUserById);


    app.use(router);
}

module.exports = { userRoutes };