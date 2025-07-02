const mongoose = require("mongoose")
const bcrypt = require("crypto")
const crypto = require("crypto");

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

//  generatin salt and the hash password before saving


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        //  generate a new salt when password change 
        this.salt = crypto.randomBytes(16).toString("hex");

        //  hashing password with salt
        const hashedPassword = await bcrypt.hash(this.password + this.salt, 10);
        this.password = hashedPassword;
        next();

    } catch (error) {
        next(error);
    }
    
});


