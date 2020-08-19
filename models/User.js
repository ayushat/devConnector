const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,

    },
    // date: {
    //     type: Date,
    //     default: Date.now,
    // }
}, {
    timestamps: true
});

module.exports = User = mongoose.model('user', UserSchema);