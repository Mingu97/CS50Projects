const PurchaseOrder = require('../models/PurchaseOrderModel');
const { client } = require('../db');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const submitPO = async (req, res) => {
    try {
        // Access the 'items' key in the request body
        const { items } = req.body;

        // Check if 'items' is an array and not empty
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Invalid request. Please provide valid items.' });
        }
        // Decode the JWT token to get the user information
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.MY_APP_SECRET_KEY);
        const userId = decodedToken.userId; // Use the correct key

        // Connect to the database
        const collection = client.db('katalog').collection('_purchaseOrders');

        // Create an array to store all items
        const purchaseOrderItems = [];

        // Loop through items and add each to the array
        for (const item of items) {
            const { supplierProductCode, brand, description, itemCode, itemQuantity } = item;
            console.log(item)
            // Check if any required field is missing
            if (!itemCode) {
                return res.status(400).json({ message: 'Invalid request. Please provide all required fields for each item.' });
            }

            // Add the item to the array
            purchaseOrderItems.push({
                supplierProductCode,
                brand,
                description,
                itemCode,
                itemQuantity,
            });
        }
        console.log("USER ID + ", userId)
        // Create a new PurchaseOrder instance with user ID and all items
        const newPO = new PurchaseOrder({
            userId: userId,
            items: purchaseOrderItems,
        });


        // Insert the new PurchaseOrder into the database
        await collection.insertOne(newPO);

        console.log('Purchase Order created successfully:', newPO);

        // Send a success response
        res.status(201).json({ message: 'Purchase Order Created successfully' });
    } catch (error) {
        // Log any errors that occur
        console.error('Error processing Purchase Order:', error);

        // Send an error response
        res.status(500).json({ message: 'Purchase Order failed' });
    } 
};



module.exports = { submitPO };
