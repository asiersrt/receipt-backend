const mongoose = require('mongoose');

const ReceiptSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Receipt', ReceiptSchema);
