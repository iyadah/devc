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

// @route    Get api/exams/:id
// @desc     Get exam by id
// @access   Public

router.get('/:id', async (req, res) => {
    try{
        const exam = await Exam.findById(req.params.id);

        if(!exam){
            return res.status(400).json({ msg: 'No exam with this id' })
        }

        res.json(exam);

    } catch(err){
            return res.status(400).json({ msg: 'Not found' });
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    Question api/exams/question/:id
// @desc     Add question to a exam
// @access   Public
router.post('/question/:id', [ 
    check('typeOfQuestion', 'typeOfQuestion is required').not().isEmpty(),
    check('title', 'title is required').not().isEmpty(),
    check('description', 'description is required').not().isEmpty() ], 
    async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    try {
        const exam = await Exam.findById(req.params.id);
        //check if the quesiton has been entered before
        const questions = exam.question;
        let question = questions.find(o => o.title === req.body.title);
        const newQuestion = {
            typeOfQuestion: req.body.typeOfQuestion,
            title: req.body.title,
            description: req.body.description,
            timeInSeconds: req.body.timeInSeconds,
            options: req.body.options,
            answer: req.body.answer
        }
        if(question){

           return res.status(400).json({ errors: [ { msg: 'this question exists'} ] }); 
        }


        exam.question.unshift(newQuestion);
        
        await exam.save();
        res.json(exam.question);

     } catch (err) {
         console.log(err.message);
         res.status(500).send('Server error');

     }

});


module.exports = router;
