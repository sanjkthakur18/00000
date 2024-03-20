const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    staff: [{
        staffId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Staff'
        },
        name: {
            type:String,
        },
        email: {
            type:String,
        },
        mobile: {
            type:String,
        },
        date: {
            type: Date,
            require: true
        },
        availability: {
            type: String,
            require: true
        }
    }],
    role: {
        type: String,
        default: 'user'
    },
    password: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('User', userSchema);