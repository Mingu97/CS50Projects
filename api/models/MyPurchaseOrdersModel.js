const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User', index: true },
    purchaseDate: { type: Date, default: Date.now },
});


const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);

module.exports = PurchaseOrder;
