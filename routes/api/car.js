const express = require('express');
const router = express.Router();
const Car = require('../../models/Car.js');

router.post('/', async (req, res) => {
    // destructure the request
    const {
        model_name,
        model_date
    } = req.body;
    // Build profile object
    const carFields = {};
    if(model_name) carFields.model_name = model_name;
    if(model_date) carFields.model_date = model_date;

    try{
        let car = await Car.findOne({ model_name });

        if(car){
           // Update
           car = await Car.findOneAndUpdate(
               { model_anme: req.model_name }, 
               { $set: carFields },
               { $new: true });
           return res.json(car);

        };
        car = new Car(carFields);
        await car.save();
        return res.json(car);

    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
  
});

module.exports = router;
