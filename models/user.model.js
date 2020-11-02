const config = require("config");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
    },
    role: {
        type: String,
        default: "admin",
        enum: ['student', 'teacher', 'admin']
    },
    accessToken: {
        type: String
    }
});

// Add new method in user schema to generate auth token.
UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({
            _id: this._id,
            email: this.email,
        },
        process.env.JWT_SECRET, {
            expiresIn: "1d"
        }
    );
    return token;
};

const User = mongoose.model("User", UserSchema);

// schema for validate request

function validateUser(user) {
    const schema = Joi
        .object({
            email: Joi
                .string()
                .min(5)
                .max(250)
                .required()
                .email({
                    minDomainSegments: 2,
                    tlds: {
                        allow: ["com", "net"],
                    },
                }),
            password: Joi
                .string()
                .min(6)
                .max(10)
                .required()
                .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
            confirmPassword: Joi.ref("password"),
            role: Joi.string().required()
        })
        //.with("password", "confirmPassword");

    try {
        return schema.validate(user);
    } catch (err) {
        console.log(err);
    };

}

module.exports.User = User;
module.exports.validate = validateUser;