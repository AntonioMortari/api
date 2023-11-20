const sequelize = require('../db/connection')
const {DataTypes} = require('sequelize')
const uuid = require('uuid')

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
        allowNull:false
    }

}, {tableName:'questions'})

module.exports = QuestionModel