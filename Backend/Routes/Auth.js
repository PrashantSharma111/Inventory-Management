const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const SECRET_KEY = process.env.SECRET_KEY;

const validators = [ 
    body('name', "Name cannot be empty").isLength({ min: 1 }), 
    body('email', "Invalid Email").isEmail(), 
    body('password', "Password must be of atleast 8 characters").isLength({ min: 8 }), 
];


// Route 1 : Add a new user using POST : /api/auth/adduser

router.post('/adduser', [...validators], async (req, res) => {

    let errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({
            message: "Errors found in user details",
            errors: errors.array(),
            success: false
        });
    }

    try
    {
        const { name, email, password } = req.body;
        // Checking if user exists
        const oldUser = await User.findOne({ email });
        if(oldUser)
        {
            return res.status(400).json({
                message: "Invalid Credentials",
                success: false
            });
        }

        // Generating hash for password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = new User({ name, email, password: hash });
        await user.save();

        const jwtPayload = {
            id: user._id
        }

        const token = jwt.sign(jwtPayload, SECRET_KEY);  
    
        res.status(200).json({
            message: "User created successfully",
            token,
            success: true
        });
    }
    catch(error)
    {
        res.status(500).json({
            messaage: "Internal server error",
            error,
            success: false
        });
    }

});

// Route 2 : Login a user using POST : /api/auth/login

router.post('/login', [ validators[1], validators[2] ], async (req, res) => {

    let errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({
            message: "Errors found in user details",
            errors: errors.array(),
            success: false
        });
    }

    try
    {
        const { email, password } = req.body;

        // Checking if user does not exist
        const user = await User.findOne({ email });
        if(!user)
        {
            return res.status(400).json({
                message: "Invalid Credentials",
                success: false
            });
        }
        
        // Compare password with saved hash
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if(!isCorrectPassword)
        {
            return res.status(400).json({
                message: "Invalid Credentials",
                success: false
            });
        }

        const jwtPayload = {
            id: user._id
        }

        const token = jwt.sign(jwtPayload, SECRET_KEY);  
    
        res.status(200).json({
            message: "Logged in successfully",
            token,
            isAdmin: user.admin,
            success: true
        });
    }
    catch(error)
    {
        res.status(500).json({
            messaage: "Internal server error",
            error,
            success: false
        });
    }

});

module.exports = router;