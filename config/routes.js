const express = require('express')
const router = express.Router()

const {authenticateUser} = require("../app/middlewares/authentication")

const usersController = require("../app/controllers/usersController")
const rolesController = require("../app/controllers/rolesController")
const taskController = require('../app/controllers/taskController')

//user 
router.get('/user', usersController.fetchAll)
router.get('/user/by-token',authenticateUser, usersController.fetchByToken)
router.post('/user/register', usersController.register)
router.post('/user/login', usersController.login)
router.get('/user/account', authenticateUser, usersController.account)



//role
router.post('/role', rolesController.create)
router.get('/role', rolesController.fetchAll)

//task
router.post('/task',authenticateUser, taskController.create)
router.post('/task/:id',authenticateUser, taskController.update)
router.get('/task',authenticateUser, taskController.list)
router.get('/task/:id',authenticateUser, taskController.show)
router.delete('/task/:id',authenticateUser, taskController.destroy)



module.exports = router