var jwt = require('jsonwebtoken');
const { URL } = require('url');
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
const allowed_access = ['/api/user/login']
const isPassUrl =(url) => {
    console.log('isPassUrl',url)
    for(let i = 0; i < allowed_access.length; i++) {
        if(url.toLowerCase() === allowed_access[i]) {
            return true;
        }
    }
    console.log("pass url failed")
    return false;
}
const authorizationJwt =  (req, res, next) => {
    console.log("call token here")
    const token = req.headers.authorization;
    const url = new URL(req.originalUrl, `http://${req.headers.host}`);
    if(isPassUrl(url.pathname)) {
        return next()
    }
    
    if(!token) {
        return res.status(403).json({message: 'token is required'})
    } 
    console.log("call token here")
    const parseToken = token.split(' ')[1]
    if(parseToken) {
        jwt.verify(parseToken, process.env.SECRET_KEY, function(err, decoded) {
            if(err) {
                return res.status(403).json({message: 'token not correct'})
            }
            req.user = decoded.data;
            console.log(decoded.data)
            next();
            
          });
    }
 
}

const authMiddlewareView = (req, res, next) => {
    if(!req.session.user) {
        return res.redirect('/login')
    }
    next();
};

module.exports = {authMiddleware, authorizationJwt,authMiddlewareView};