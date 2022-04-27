const express = require('express');
const router = express.Router();
const trackersController = require('../controllers/habits')

router.route('/')
    .get(trackersController.index)
    .post(trackersController.create)

router.route('/:id')
    .get(trackersController.show)
    .delete(trackersController.destroy)
    .put(trackersController.update)


module.exports = router;