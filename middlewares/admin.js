const jwt = require('jsonwebtoken');


module.exports = {
    isAdmin: (req, res, next) =>{
        const token  = req.header('auth-token');
        if(!token) return res.status(401).json('Access Denied');
    const verified = jwt.verify("gfg_jwt_secret_key");
    console.log(verified);
        if(verified.role == 'admin'){
            next();
        }else{
            res.status(403).json("You are not allowed to access this route!!");
        }
    }
}



