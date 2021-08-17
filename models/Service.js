const mongoose = require('mongoose');
const ServiceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    serviceDeliveryDay: {
        type: Number,
        required: true
    },
    serviceDeliveryHour: {
        type: Number,
        required: true
    }
});
    
module.exports = mongoose.model('service', ServiceSchema);
    