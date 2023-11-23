const sequelize = require('../db/connection')
const {DataTypes} = require('sequelize')
const uuid = require('uuid')

// models
const UserModel = require('./UserModel')

const QuestionModel = sequelize.define('Question', {

    id:{
        type:DataTypes.STRING,
        primaryKey:true,
        defaultValue:uuid.v4()
    },

    title:{
        type:DataTypes.STRING,
        allowNull:false
    },

    content:{
        type:DataTypes.STRING(300)
    },

    image_url:{
        type:DataTypes.STRING
    },

    likes:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },

    publication:{
        type:DataTypes.DATE,
    },

    user_id:{
        type:DataTypes.STRING,
    }

}, {tableName:'questions'})

QuestionModel.belongsTo(UserModel, {
    constraints:true,
    foreignKey:'user_id'
})

module.exports = QuestionModel