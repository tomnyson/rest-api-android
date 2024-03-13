
const authMiddleware = (req, res, next) => {
    console.log('auth middleware',process.env);
    if(req.method != 'GET') {
        if(req.query.API_KEY === process.env.API_KEY){
             next();
        }else{ res.status(403).json({message:"Invalid API key"})
    }
    }else {
        next();
    }

   
}

module.exports = authMiddleware;