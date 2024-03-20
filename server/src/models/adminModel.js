const mongoose = require('mongoose');

var adminSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: 'admin'
    },
    password: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Admin', adminSchema);