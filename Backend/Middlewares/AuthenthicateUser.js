const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const validate = (req, res, next) => {

    const token = req.header('Auth-Token');

    if(!token)
    {
        return res.status(401).json({
            message: "Invalid Token"
        });
    }

    try
    {
        const jwtPayload = jwt.verify(token, SECRET_KEY);
        const id = jwtPayload.id;
        req.id = id;
    }
    catch(error)
    {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error
        });
    }
    
    next();
};

module.exports = validate;