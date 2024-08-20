const mongoose = require('mongoose')

const AppointmentSchema = new mongoose.Schema({
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: [true, "Service id isn't provided"]
    },
    purpose:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    morningTime:{
        type: String,
        required: true
    },
    eveningTime:{
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Appointment', AppointmentSchema)