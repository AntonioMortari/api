const express = require('express')
const cors = require('cors')
const app = express()

require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

// connect to db
const sequelize = require('./db/connection')

// routes
const usersRoutes = require('./routes/users.routes')

app.use('/users', usersRoutes)

app.listen(3000, () => console.log('server is running'))
