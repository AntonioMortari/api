const express = require('express')
const router = express.Router()

//controller
const QuestionController = require('../controllers/QuestionsController')
const questionController = new QuestionController()

// middlewares
const authMiddleware = require('../middlewares/auth')
const upload = require('../middlewares/multer')

router.get('/', questionController.index)
router.get('/:id', questionController.show)

router.post('/', authMiddleware, upload.single('file'), questionController.create)

router.put('/:id', authMiddleware, upload.single('file'), questionController.update)

router.delete('/:id', authMiddleware, questionController.delete)

module.exports = router