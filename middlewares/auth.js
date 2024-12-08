const jwt = require('jsonwebtoken')

exports.auth = async (req,res,next)=>{
    const token = req.headers.authorization.split(' ')[1]
    if(!token){
        return res.status(404).json({message:"not authorized"})
    }
    try{ 
        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user = decode
        next()

    }catch(err){
        return res.status(401).json({error:'unauthorized user',err})
    }
    
   
}