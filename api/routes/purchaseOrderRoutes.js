const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const purchaseOrderController = require('../controllers/purchaseOrderController');
const authenticate = require('../controllers/authMiddleware');
const { updateSession } = require('../controllers/userController');
const PurchaseOrder = require('../models/PurchaseOrderModel');

router.post('/submit', authenticate, purchaseOrderController.submitPO);

router.post('/clear-session', authenticate, async (req, res) => {
    try {
        const userId = req.user.userId;
        await updateSession(userId, []);
        res.status(200).json({ message: 'Workflow executed successfully', clearSession: true });
    } catch (error) {
        console.error('Error clearing session:', error);
        res.status(500).json({ message: 'Error clearing session' });
    }
});

// New route to get all purchase orders for the authenticated user
router.get('/all', authenticate, async (req, res) => {
    try {
        const userId = req.user.userId;
        const purchaseOrders = req.db.collection('_purchaseOrders');
        console.log("USER ID:+", userId)
        
        // Use find method and toArray to retrieve the results as an array
        const purchaseOrdersList = await purchaseOrders.find({ userId: new ObjectId(userId) }).toArray();

        // Format the date and time
        const formattedPurchaseOrders = purchaseOrdersList.map(po => ({
            ...po,
            purchaseDate: new Date(po.purchaseDate).toLocaleString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
            })
        }));
        // Fetch all purchase orders for the specific user
        res.status(200).json(formattedPurchaseOrders);
    } catch (error) {
        console.error('Error getting purchase orders:', error);
        res.status(500).json({ message: 'Error getting purchase orders' });
    }
});

module.exports = router;
