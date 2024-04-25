const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectToDatabase = require('./db');

const app = express();

connectToDatabase();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./Routes/Auth'));
app.use('/api/inventory', require('./Routes/Inventory'));

app.listen(5000, () => {
    console.log("Inventory Management Backend Running on port 5000");
});