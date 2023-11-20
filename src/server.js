const express = require('express')
const cors = require('cors')
const app = express()

require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// models
const UserModel = require('./models/UserModel')
const QuestionModel = require('./models/QuestionModel')
const AnswerModel = require('./models/AnswerModel')

// connect to db
const sequelize = require('./db/connection')

// create tables
const createTables = async () => {
    try {
        await UserModel.sync()
        await QuestionModel.sync()
        await AnswerModel.sync()
        console.log('Tabelas criadas com sucesso!')
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}
createTables()

// routes
const usersRoutes = require('./routes/users.routes')

app.use('/users', usersRoutes)

app.listen(3000, () => console.log('server is running'))
