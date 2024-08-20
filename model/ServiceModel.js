const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema({
    service :{
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    medicalReport: {
        type: String,
        // required: true
    },
    message: {
        type: String,
    },
    purpose: {
        type: String
    }

})

module.exports = mongoose.model('Service', ServiceSchema)