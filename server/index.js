
require('dotenv').config()
const express = require('express')
const userRouter = require('./routes/user.routes')
const taskRouter = require('./routes/task.routes')
const PORT = 8080
const errorHandler = require('./middleware/ErrorHandlingMiddleware.js')
const fileUpload = require('express-fileupload')
const sequelize = require('./dbb.js')
const cors = require('cors');


const app = express()

app.use(express.json())
app.use(cors());
app.use('/api', userRouter)
app.use('/api', taskRouter)
app.use(fileUpload({}))
//обработка ошибок 
app.use(errorHandler)

app.listen(PORT, () => console.log(`server ${PORT}`))  