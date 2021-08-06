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
    },
    question: [
        {
          typeOfQuestion: {
              type: Number,  // 1: Radio, 2: Checkbox, 3: Text field, 4: Text area
              required: true
          },
          title: {
            type: String,
            required: true
          },
          description: {
            type: String,
            required: true
          },  
          timeInSeconds:{ 
              type: Number
          },
          options: [{
                type: String
          }],
          answer: [{
            type: String
        }]
        }
    ],
});

module.exports = mongoose.model('exam', ExamSchema);
