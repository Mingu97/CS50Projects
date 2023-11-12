const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
  items: [
    {
      _id: false, // This line excludes the automatic generation of _id for each item
      supplierProductCode: { type: String, required: true },
      brand: { type: String, required: true },
      description: { type: String, required: true },
      itemCode: { type: String, required: true },
      itemQuantity: { type: Number, required: true },
    },
  ],
  // Add other properties related to the purchase order
  // For example, you can add a purchaseDate field
  purchaseDate: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);

module.exports = PurchaseOrder;
