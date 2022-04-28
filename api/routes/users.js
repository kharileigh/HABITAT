const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.route('/register')
    .post(usersController.register)

router.route('/login')
    .post(usersController.login)

router.route('/logout')
    .get(usersController.logout)

router.route('/')
    .get(usersController.index)

router.route('/:id')
    .get(usersController.show)
    .delete(usersController.deleteUser)

module.exports = router;