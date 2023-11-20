const QuestionModel = require('../models/QuestionModel')

class QuestionsController{

    async index(req,res){

    }

    async show(req,res){

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