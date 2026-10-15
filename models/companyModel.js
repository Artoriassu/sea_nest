const mongoose = require("mongoose")

//schema

const companySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    imageUrl: {
        type: String,
    },
    news: {type: Array},
    products: {type: Array},
    time: {
        type: String,
    },
    logoUrl: {
        type: String,
    },
    address: {
        type: String,
        required: [true, "Address is required"]
    },
    phone: {
        type: String,
        required: [true, "Phone is required"]
    },
}, { timestamps: true })

//exports
module.exports = mongoose.model("Company", companySchema)