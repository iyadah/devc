const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Exam = require('../../models/Exam')

// @route    Post api/exams
// @desc     Add exam
// @access   Public
router.post('/', [  
                check('title', 'Title is required').not().isEmpty(),
                check('description', 'Description is required').not().isEmpty(),
                check('numberOfQuestions', 'numberOfQuestions is required').not().isEmpty()
             ], 
       async (req,res) => {
       const errors = validationResult(req);
       if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
       }

       try {
            const newExam = new Exam({
                title: req.body.title,
                description: req.body.description,
                numberOfQuestions: req.body.numberOfQuestions

            });

        const exam = await newExam.save();
        res.json(exam);
            
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error');
            
        }

});

// @route    Get api/exams
// @desc     Get all exams
// @access   Public
router.get('/', async (req,res) => {
    try {
        const exams = await Exam.find();
        res.json(exams);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }

});

module.exports = router;
