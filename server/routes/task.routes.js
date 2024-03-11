const Router = require('express')
const router = new Router()
const taskController = require('../controllers/task.controller.js')
const checkRole = require('../middleware/checkRoleMiddleware.js')

router.post('/task', taskController.createTask)
router.get('/task', taskController.getTask)
router.get('/task/:id', checkRole('ADMIN'||'user'), taskController.getOneTask)
router.put('/task', taskController.updateTask)
router.delete('/task/:id', taskController.deleteTask)



module.exports=router 