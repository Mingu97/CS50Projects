const express = require('express');
const router = express.Router();
const purchaseOrderController = require('../controllers/purchaseOrderController')

router.post('/submit', purchaseOrderController.submitPO);

module.exports = router;
