const sequelize = require("../db/connection")

const {DataTypes} = require('sequelize')
const uuid = require('uuid')

const UserModel = sequelize.define('User', {

    id:{
        primaryKey:true,
        defaultValue: uuid.v4(),
        type: DataTypes.STRING
    },

    name:{
        type: DataTypes.STRING,
        allowNull: false
    },

    email:{
        type:DataTypes.STRING(150),
        unique:true,
        allowNull:false
    },

    password:{
        type:DataTypes.STRING,
        allowNull:false
    },

    profile_url:{
        type:DataTypes.STRING,
        defaultValue:''
    }

})

module.exports = UserModel