const express = require('express');
const router = express.Router();
const plantsController = require('../controllers/plants')

// same structure we saw but I organised it and ADDED update option
router.route('/')
    .get(plantsController.index)
    .post(plantsController.create)


router.route('/:id') 
    .get(plantsController.show)
    .delete(plantsController.destroy)
    .put(plantsController.update)


module.exports = router;