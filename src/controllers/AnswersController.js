
const AnswerModel = require('../models/AnswerModel')
const QuestionModel = require('../models/QuestionModel')
const UserModel = require('../models/UserModel')

class AnswersController {

    async index(req, res) {
        const answers = await AnswerModel.findAll()

        res.status(200).json(answers)
    }

    async show(req, res) {
        const { id } = req.params

        const answer = await AnswerModel.findByPk(id)
        if (!answer) {
            return res.status(404).json({ message: 'Resposta não encontrada' })
        }

        // get question
        const question_associated = await QuestionModel.findByPk(answer.question_id)

        res.status(200).json({answer:answer, question_associated: question_associated})
    }

    async create(req, res) {
        const { content, user_id, question_id } = req.body

        if (!content || !question_id || !user_id) {
            return res.status(400).json({ message: 'Dados faltando' })
        }

        // findUser
        const findUser = await UserModel.findByPk(user_id)
        if (!findUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }

        // findQuestion
        const findQuestion = await QuestionModel.findByPk(question_id)
        if (!findQuestion) {
            return res.status(404).json({ message: 'Pergunta não encontrada' })
        }

        // create
        const result = await AnswerModel.create({
            content,
            question_id,
            user_id,
            publication: new Date()
        })

        res.status(201).json({ message: 'Resposta criada com sucesso', result: result })

    }

    async update(req, res) {
        const { id } = req.params

        // findAnswer
        const findAnswer = await AnswerModel.findByPk(id)
        if(!findAnswer){
            return res.status(404).json({message:`Resposta de id ${id} não encontrada`})
        }

        const result = await AnswerModel.update({
            content: req.body.content || findAnswer.content
        }, { where:{id:id}})

        res.status(200).json({message:'Resposta atualizada com sucesso', result:result})
    } 

    async delete(req, res) {
        const { id } = req.params

        try {
            const result = await AnswerModel.destroy({ where: { id: id } })
            return res.status(200).json({ message: `Pergunta de id ${id} deletada com sucesso`, result: result })
        } catch (error) {
            return res.status(400).json({message:`Erro ao remover resposta de id ${id}`, error:error})
        }

    }

}

module.exports = AnswersController