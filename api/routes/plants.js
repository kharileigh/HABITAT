const express = require('express');
const router = express.Router();
const plantsController = require('../controllers/plants')

router.route('/')
    .get(plantsController.index)
    .post(plantsController.create)

router.route('/:id') 
    .get(plantsController.show)
    .delete(plantsController.destroy)
    .put(plantsController.update)


module.exports = router;