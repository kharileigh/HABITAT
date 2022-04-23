const express = require('express');
const router = express.Router();
const booksController = require('../controllers/plants')

router.get('/', booksController.index)
router.get('/:id', booksController.show)
router.post('/', booksController.create)
router.delete('/:id', booksController.destroy)
router.put('/:id', booksController.update)

module.exports = router;