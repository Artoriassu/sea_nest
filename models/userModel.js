const mongoose = require("mongoose")

//schema

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "user name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        unique: true
    },
    userType: {
        type: String,
        required: [true, "userType is required"],
        default: "client",
        enum: ["client", "admin"]
    },
    profile: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/9187/9187604.png",
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
}, { timestamps: true })

//exports
module.exports = mongoose.model("User", userSchema)