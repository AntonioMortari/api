const sequelize = require('../db/connection')
const { DataTypes} = require('sequelize')
const uuid = require('uuid')

// models
const UserModel = require('./UserModel')

const RefreshModel = sequelize.define('Refresh_Token', {

    // refresh token == id
    id:{
        type:DataTypes.STRING,
        primaryKey:true,
        defaultValue:uuid.v4()
    },

    user_id:{
        type:DataTypes.STRING,
        allowNull:false
    },

    expiresIn:{
        type:DataTypes.DATE,
        allowNull:false
    }

}, { tableName: 'refresh_tokens'})

RefreshModel.belongsTo(UserModel, {
    foreignKey: 'user_id',
    constraints:true
})

module.exports = RefreshModel