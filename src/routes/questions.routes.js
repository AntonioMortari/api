const express = require('express')
const router = express.Router()

//controller
const QuestionController = require('../controllers/QuestionsController')
const questionController = new QuestionController()

router.get('/',  questionController.index)
router.get('/:id', questionController.show)

module.exports = router