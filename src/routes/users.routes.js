const express = require('express')
const router = express.Router()

// controller
const UsersController = require('../controllers/UsersController')
const usersController = new UsersController()

// middlewares
const upload = require('../middlewares/multer')
const authMiddleware = require('../middlewares/auth')

router.get('/', usersController.index)
router.get('/:id', usersController.show)

router.post('/', usersController.create)

router.post('/auth', usersController.auth)
router.post('/refresh', usersController.refresh)

router.put('/:id', authMiddleware, upload.single('file'), usersController.update)

module.exports = router