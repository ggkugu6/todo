const jwt = require('jsonwebtoken')

module.exports= function(req, res, next){
   if(req.method === "OPTIONS"){
        next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1]
        if(!token) {
            return res.status(401).json({massage: "Не авторизован"})
        } 
        const decoded = jwt.verify(token, process.env.DB_TOKEN)
        req.user = decoded
        next()
    } catch (e){
        res.status(401).json({massage: "Не авторизован"})
    }
    /*const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.DB_TOKEN)
    return console.log(decoded)*/
    
}   