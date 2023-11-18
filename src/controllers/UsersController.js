const UserModel = require("../models/UserModel")

const bcrypt = require('bcrypt')

class UsersController{
    async index(req,res){
        const result = await UserModel.findAll()

        res.status(200).json(result)
    }

    async show(req,res){
        const { id } = req.params

        const findUser = await UserModel.findByPk(id)

        if(!findUser){
            return res.status(404).json({message:'Usuário não encontrado'})
        }

        res.status(200).json(findUser)
    }

    async create(req,res){
        const {name, email, password} = req.body

        if(!name || !email || !password){
            // verify data
            return res.status(400).json({message:'Dados faltando!'})
        }

        // verify user exists
        const findUser = await UserModel.findOne({where:{email:email}})
        if(findUser){
            return res.status(400).json({message:`Usuário de email ${email} já cadastrado`})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await UserModel.create({
            name,
            email,
            password: hashedPassword
        })

        res.status(201).json({message:'Usuário criado com sucesso', result: result})
    }

    async update(req,res){

    }

    async auth(req,res){

    }
}

module.exports = UsersController