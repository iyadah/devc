const mongoose = require('mongoose');
const ExamSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    numberOfQuestions: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('exam', ExamSchema);
