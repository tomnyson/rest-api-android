var jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
    // var token = jwt.sign({
    //     data:  {
    //         'username': 'admin'
    //     }
    //   }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRE_TIME });
    
    // jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiYWRtaW4ifSwiaWF0IjoxNzEwNzQ5MDMxLCJleHAiOjE3MTA3NDkzMzF9.UHidDX5OGgoC6Sd-IGwhD62stVgFMiVaA2eRtUD4TuI', process.env.SECRET_KEY, function(err, decoded) {
    //     if(err) {
    //         console.error(err);
    //     }
    //     console.log(decoded);
        
    //   });
      
    // console.log('token',token);
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