const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Service = require('../../models/Service')
const { check, validationResult } = require('express-validator');


// @route    GET api/services
// @desc     Test route
// @access   Public
router.get('/', auth, async (req, res) => {
    try{
        const service = await Service.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if(!service){
            return res.status(400).json({ msg: 'No service for this user' })
        }
        setTimeout(() => res.json(profile), 2000);
        res.json(service);

    } catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    POST api/services
// @desc     Create or update the user services
// @access   Private
router.post('/', [auth, [
    check('title', 'title is required').not().isEmpty(),
    check('price', 'price is required').not().isEmpty(),
    check('image', 'image is required').not().isEmpty(),
    check('serviceDeliveryDay', 'serviceDeliveryDay is required').not().isEmpty(),
    check('serviceDeliveryHour', 'serviceDeliveryHour is required').not().isNumeric()

]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ erros: errors.array() })
    }
    // destructure the request
    const {
        title,
        description,
        price,
        image,
        serviceDeliveryDay,
        serviceDeliveryHour
    } = req.body;
    // Build profile object
    const serviceFields = {};
    serviceFields.user = req.user.id;
    if(title) serviceFields.title = title;
    if(description) serviceFields.description = description;
    if(image) serviceFields.image = image;
    if(price) serviceFields.price = price;
    if(serviceDeliveryDay) serviceFields.serviceDeliveryDay = serviceDeliveryDay;
    if(serviceDeliveryHour) serviceFields.serviceDeliveryHour = serviceDeliveryHour;

 
    try{
        let service = await Service.findOne({ title:req.title }, {});
        if(service){
           // Update
           service = await Service.findOneAndUpdate(
               { title:req.title }, 
               { $set: serviceFields },
               { $new: true });
           return res.json(service);

        };
        service = new Service(serviceFields);
        await service.save();
        return res.json(service);

    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
