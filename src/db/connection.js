const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    { dialect: 'mysql', host: 'localhost', port: 3307 })

try {
    sequelize.authenticate()
    console.log('Connection Successfully')
} catch (error) {
    console.log(error)
    throw new Error(error)
}

module.exports = sequelize