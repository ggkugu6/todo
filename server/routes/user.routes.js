const Router = require('express')
const router = new Router()
const userController = require('../controllers/user.controller.js')
const authMiddleware = require('../middleware/authMiddleware.js')

router.post('/user', userController.createUser)
router.get('/user', userController.getUser)
router.get('/user/:user_id', userController.getOneUser)
router.put('/user', userController.updateUser)
router.delete('/user/:user_id', userController.deleteUser)
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)


module.exports=router 