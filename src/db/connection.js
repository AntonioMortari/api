const { Sequelize } = require('sequelize')

// models
const UserModel = require('../models/UserModel')

const { DB_NAME, DB_USER, DB_PASSWORD } = require('../config/config')

const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    { dialect: 'mysql', host: 'localhost', port: 3306 })

try {
    sequelize.authenticate()
    console.log('Connection Successfully')
} catch (error) {
    console.log(error)
    throw new Error(error)
}



module.exports = sequelize