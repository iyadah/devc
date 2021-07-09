const mongoose = require('mongoose');
const CarSchema = new mongoose.Schema({
    model_name: {
        type: String
    },
    model_date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('car', CarSchema);
