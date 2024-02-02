const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { transformToJSON } = require('../utils/mongooseUtils');

const userSchema = new Schema(
    {
        name: {
            type: String,
        },
        username: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (v) {
                    return /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
                },
                message: (props) => `${props.value} is not a valid email address!`,
            },
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['USER', 'ADMIN', 'SUPERADMIN'],
            default: 'USER',
        },
    },
    { timestamps: true },
);

transformToJSON(userSchema, 'id');
const User = mongoose.model('User', userSchema);

module.exports = User;
