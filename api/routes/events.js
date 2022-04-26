const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events')

router.route('/')
    .get(eventsController.index)
    .post(eventsController.create)

router.route('/:id') 
    .get(eventsController.show)
    .delete(eventsController.destroy)
    .put(eventsController.update)


module.exports = router;