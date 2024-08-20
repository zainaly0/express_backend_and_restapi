const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLenght: 10,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
        default: "Customer",
        enum: ["CUSTOMER", "ADMIN"],
    },
}, { timestamps: true, versionKey: false });

const UserModel = mongoose.model("User", userSchema)
module.exports = UserModel;