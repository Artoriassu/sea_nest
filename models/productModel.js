const mongoose = require("mongoose")

//schema

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Product title is required"]
    },
    description: {
        type: String,
        required: [true, "Product description is required"]
    },
    price: {
        type: Number,
        required: [true, "Product price is required"]
    },
    imageUrl: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/128/718/718970.png"
    },
    code: {
        type: String,
    },
    status: {
        type: String,
        default: "available"
    },

}, { timestamps: true })

//exports
module.exports = mongoose.model("Products", productsSchema)