const sequelize = require('../db/connection')
const { DataTypes } = require('sequelize')
const uuid = require('uuid')

// models
const UserModel = require('./UserModel')
const AnswerModel = require('./AnswerModel')

const QuestionModel = sequelize.define('Question', {

    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: uuid.v4()
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    content: {
        type: DataTypes.STRING(300)
    },

    image_url: {
        type: DataTypes.STRING
    },

    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },

    publication: {
        type: DataTypes.DATE,
    },

    user_id: {
        type: DataTypes.STRING,
    }

}, { tableName: 'questions' })

QuestionModel.hasMany(AnswerModel, {
    constraints:true,
    foreignKey:'question_id'
})

module.exports = QuestionModel