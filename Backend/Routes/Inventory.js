const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const authenticate = require('../Middlewares/AuthenthicateUser');
const checkAdmin = require('../Middlewares/AdminCheck');
const Item = require('../Models/Item');

const validators = [
    body('name', "Name cannot be empty").isLength({ min: 1 }),
    body('qty', "Quantity must be numeric").isNumeric()
];

// Route 1 : Add new item using POST : /api/inventory/add
// Required authentication

router.post('/add', authenticate, checkAdmin, [ ...validators ], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({
            message: "Invalid inputs",
            success: false
        });
    }

    try
    {
        const { name, qty, category, imageURL } = req.body;

        // Check if item already exists
        const oldItem = await Item.findOne({ name });
        if(oldItem)
        {
            return res.status(400).json({
                message: "Item already exists",
                success: false
            });
        }

        const item = new Item({
            name,
            qty,
            category,
            imageURL
        });

        await item.save();

        res.status(200).json({
            message: "Item created successfully!",
            item,
            success: true
        });
    } 
    catch(error)
    {
        res.status(500).json({
            message: "Internal Server Error",
            error,
            success: false
        });
    }

});

// Route 2 : Get all items of a user using GET : /api/inventory/getall
// Required authentication

router.get('/getall', authenticate, async (req, res) => {

    try
    {
        const items = await Item.find({});

        res.status(200).json({
            message: "Item created successfully!",
            items,
            success: true
        });
    } 
    catch(error)
    {
        res.status(500).json({
            message: "Internal Server Error",
            error,
            success: false
        });
    }

});

// Route 3 : Update an item using PUT : /api/inventory/update
// Required authentication

router.put('/update/:id', authenticate, checkAdmin, [ ...validators ], async (req, res) => {

    try
    {
        const { name, qty, category, imageURL } = req.body;
        const item = await Item.findById(req.params.id);

        if(!item)
        {
            return res.status(400).json({
                message: "Item not found",
                success: false
            });
        }

        const newItem = {};
        if(name) newItem.name = name;
        if(qty) newItem.qty = qty;
        if(category) newItem.category = category;
        if(imageURL) newItem.imageURL = imageURL;

        const updatedItem = await Item.findByIdAndUpdate(req.params.id, { $set: newItem }, { new: true });

        res.status(200).json({
            message: "Item updated successfully!",
            updatedItem,
            success: true
        });
    } 
    catch(error)
    {
        res.status(500).json({
            message: "Internal Server Error",
            error,
            success: false
        });
    }

});

// Route 4 : Delete an item using DELETE : /api/inventory/delete
// Required authentication

router.delete('/delete/:id', authenticate, checkAdmin, async (req, res) => {

    try
    {
        const item = await Item.findById(req.params.id);

        if(!item)
        {
            return res.status(400).json({
                message: "Item not found",
                success: false
            });
        }

        const deletedItem = await Item.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Item deleted successfully!",
            deletedItem,
            success: true
        });
    } 
    catch(error)
    {
        res.status(500).json({
            message: "Internal Server Error",
            error,
            success: false
        });
    }

});

module.exports = router;