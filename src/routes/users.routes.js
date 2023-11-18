const express = require('express')
const router = express.Router()

// controller
const UsersController = require('../controllers/UsersController')
const usersController = new UsersController()

router.get('/', usersController.index)
router.get('/:id', usersController.show)

router.post('/', usersController.create)
router.post('/auth', usersController.auth)

router.put('/:id', usersController.update)

module.exports = router