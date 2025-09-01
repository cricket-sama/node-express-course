const express = require('express')
const router = express.Router()

const { logonController, helloController } = require('../controllers/main')

const authMiddleware = require('../middleware/auth')

router.post('/logon', logonController)
router.get('/hello', authMiddleware, helloController)

module.exports = router