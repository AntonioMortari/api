const QuestionModel = require('../models/QuestionModel')
const UserModel = require('../models/UserModel')

class QuestionsController{

    async index(req,res){
        const questions = await QuestionModel.findAll()

        res.status(200).json(questions)
    }
    async show(req,res){
        const { id } = req.params

        const question = await QuestionModel.findByPk(id, { include: UserModel})

        if(!question){
            res.status(404).json({message:'Pergunta não encontrada'})
        }

        res.status(200).json(question)
    }

    async create(req,res){
        const { title, content, user_id} = req.body

        if(!title || !content || !user_id){
            return res.status(400).json({message:'Preencha  os dados corretamente'})
        }

        // findUser
        const findUser = await UserModel.findByPk(user_id)
        if(!findUser){
            return res.status(404).json({message:'Usuário não encontrado'})
        }

        const result = await QuestionModel.create({
            title,
            content,
            user_id,
            image_url: req.file && req.file.filename,
            publication: new Date()  
        })

        res.status(201).json({message:'Pergunta criada com sucesso', result:result})
        
    }

    async update(req,res){

    }

    async delete(req,res){
        const { id } = req.params

        //verify question exists
        const findQuestion = await QuestionModel.findByPk(id)

        if(!findQuestion){
            return res.status(400).json({message:`Pergunta de id ${id} não existe!`})
        }

        const result = await QuestionModel.destroy({where:{id:id}})

        res.status(200).json({message:'Pergunta deletada com sucesso!', result:result})
    }

}   

module.exports = QuestionsController