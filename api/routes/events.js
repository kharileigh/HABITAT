const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events');

router.route('/')
    .get(eventsController.index)

router.route('/:id') 
    .get(eventsController.show)
    .delete(eventsController.destroy)
    
module.exports = router;