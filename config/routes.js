const express = require('express')
const router = express.Router()

const {authenticateUser} = require("../app/middlewares/authentication")

const usersController = require("../app/controllers/usersController")


router.post('/user/register', usersController.register)
router.get('/user/login', usersController.login)
router.get('/user/account', authenticateUser, usersController.account)
router.delete('/user/logout', usersController.logout)

module.exports = router