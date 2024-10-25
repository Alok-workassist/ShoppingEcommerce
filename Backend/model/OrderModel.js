const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    shippingInfo: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true, default: "India" },
        pincode: { type: Number, required: true },
        phoneNo: { type: Number, required: true }
    },
    orderItem: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 0 },
        image: { type: String, required: true },
        product: { type: mongoose.Schema.ObjectId, ref: "Products", required: true },
    }],
    user: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
    paymentInfo: {
        id: { type: String, required: true },
        status: { type: String, required: true },
    },
    paidAt: { type: Date, required: true },
    itemPrice: { type: Number, required: true, default: 0 },
    taxPrice: { type: Number, required: true, default: 0 },
    shippingPrice: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true, default: 0 },
    orderStatus: { type: String, default: "Processing", required: true },
    deliveredAt: Date,
    createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Orders", OrderSchema);
