const mongoose = require('mongoose');

var staffSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    mobile: {
        type: String,
        require: true
    },
    availability: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Staff', staffSchema);