const mongoose = require("mongoose")

//schema

const orderSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    buyerNumber: {
        type: String,
        required: [true, "Buyer phone number is required"]
    },
    status: {
        type: String,
        enum: ['pending', 'discussing', 'accepted', 'declined', 'finished'],
        default: 'pending'
    }
}, { timestamps: true })

//exports
module.exports = mongoose.model("Order", orderSchema)