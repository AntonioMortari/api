const UserModel = require("../models/UserModel")
const RefreshModel = require('../models/RefreshModel')

const bcrypt = require('bcrypt')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const dateFns = require('date-fns')
const { KEY_JWT } = require("../config/config")

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
        const { id } = req.params
        const findUser = await UserModel.findByPk(id)

        if(!findUser){
            return res.status(404).json({message:'Usuário não encontrado'})
        }

        // get data from body
        const name = req.body.name || findUser.name
        const email = req.body.email || findUser.email
        let oldPassword = req.body.oldPassword
        const newPassword = req.body.newPassword
        let profile_url = ''
        if(req.file){
            profile_url = req.file.filename
        }

        if(!req.body.oldPassword){
            return res.status(400).json({message:'Senha antiga necessária'})
        }

        if(req.body.email){
            const verifyEmailExist = await UserModel.findOne({where:{email:email}})
    
            if(verifyEmailExist){
                return res.status(400).json({message:`E-mail ${email} já existe!`})
            }
        }

        // verify password
        const checkPassword = await bcrypt.compare(oldPassword, findUser.password)

        if(!checkPassword){
            return res.status(400).json({message:'Usuário ou senha incorretos'})
        }


        oldPassword = findUser.password

        // save new data
        const result = await UserModel.update({
            name,
            email,
            password: newPassword ? await bcrypt.hash(newPassword, 10) : oldPassword,
            profile_url
        }, {where:{id:id}})

        res.status(200).json({message:'Dados atualizados com sucesso!', result:result})
    }

    async auth(req,res){
        const { email, password} = req.body

        //verify user exists
        const findUser = await UserModel.findOne({where:{email:email}})
        if(!findUser){
            return res.status(400).json({message:'Email ou senha incorretos'})
        }

        //compare passwords
        const comparePassword = await bcrypt.compare(password, findUser.password)
        if(!comparePassword){
            return res.status(400).json({message:'Email ou senha incorretos'})
        }

        // generate acess token

        const accessToken = jwt.sign({userId: findUser.id}, KEY_JWT, {
            expiresIn: '15m',
        })

        // delete refreshToken
        await RefreshModel.destroy({
            where: {user_id : findUser.id}
        })

        // generate refreshToken
        const expiresIn = dateFns.addDays(new Date(), 15)
        const refreshToken = await RefreshModel.create({
            user_id: findUser.id,
            expiresIn
        })

        return res.status(200).json({message:'Autenticado', accessToken:accessToken, refreshToken: refreshToken})
    }

    async refresh(req,res){
        const { refreshToken } = req.body
        let newRefreshToken;
        
        const findToken = await RefreshModel.findByPk(refreshToken, { include: UserModel})
        if(!findToken){
            return res.status(400).json({message:'Invalid RefreshToken'})
        }

        const dataUser = findToken.User.dataValues

        if(!dateFns.isBefore(new Date(), findToken.expiresIn)){
            // if expired, remove old refresh token, generate new refresh token and save

            await RefreshModel.destroy({where:{id: refreshToken}})

            const expiresIn = dateFns.addDays(new Date(), 15)

            newRefreshToken = await RefreshModel.create({
                id: uuid.v4(),
                expiresIn,
                user_id: findToken.user_id
            })
        }

        const newAccessToken = jwt.sign({userId: dataUser.id}, KEY_JWT, {
            expiresIn: '15m',
        })

        return res.status(200).json({accessToken:newAccessToken, refreshToken: newRefreshToken ? newRefreshToken : refreshToken })
    }
}

module.exports = UsersController