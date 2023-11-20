const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next) =>{
    const token = req.headers.authorization

    if(!token){
        return res.status(401).json({message:'Token is missing'})
    }

    jwt.verify(token, process.env.KEY_JWT, (error, decoded ) =>{
        if(error){
            return res.status(401).json({message:'Invalid Token', error:error})
        }

        console.log(decoded)
        next()
    })

}

module.exports = authMiddleware