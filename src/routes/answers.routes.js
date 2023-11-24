const express = require('express')
const router = express.Router()

// controller
const AnswersController = require('../controllers/AnswersController')
const answersController = new AnswersController()

// middlewares
const authMiddleware = require('../middlewares/auth')

router.get('/', answersController.index)
router.get('/:id', answersController.show)

router.post('/', authMiddleware, answersController.create)

router.put('/:id', authMiddleware, answersController.update)

router.delete('/:id', authMiddleware, answersController.delete)

module.exports = router