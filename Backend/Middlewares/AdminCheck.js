const User = require('../Models/User');

const validateAdmin = async (req, res, next) => {

    try
    {
        const user = await User.findById(req.id);
        if(!user.admin)
        {
            res.status(401).json({
                message: "Not Admin",
                success: false
            });
        }
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

module.exports = validateAdmin;