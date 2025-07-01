const mongoose = require("mongoose")
const bcrypt = require("crypto")


const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase:true,
        },
        password: {
            type: String,
            required: true,
            minlength:8,
        },
        salt: {
            type: String,
            required: true,
            minlength:6,
        },

    },
    {
        timestamps:true,
    }
)

