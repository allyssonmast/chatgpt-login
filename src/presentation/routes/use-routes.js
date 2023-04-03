const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', userController.loginUser);
router.post('/users', userController.createUser);
router.get('/users/:id', userController.findUserById);

module.exports = router;
