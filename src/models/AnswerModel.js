const sequelize = require('../db/connection')
const {DataTypes} = require('sequelize')
const uuid = require('uuid')

const AnswerModel = sequelize.define('Answer', {

    id:{
        type:DataTypes.STRING,
        primaryKey:true,
        defaultValue:uuid.v4()
    },

    content:{
        type:DataTypes.STRING(500),
        allowNull:false,
    },

    likes:{
        type:DataTypes.INTEGER,
        defaultValue:0,
    },

    publication:{
        type:DataTypes.DATE,
        allowNull:false
    }

}, { tableName:'answers' })

module.exports = AnswerModel