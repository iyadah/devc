const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
// @route    GET api/profile/me
// @desc     Test route
// @access   Public
router.get('/me', auth, async (req, res) => {
    try{
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if(!profile){
            return res.status(400).json({ msg: 'No profile for this user' })
        }
        res.json(profile);

    } catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
})


// @route    POST api/profile
// @desc     Create or update the user profile
// @access   Private
router.post('/', [auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ erros: errors.array() })
    }
    // destructure the request
    const {
        website,
        skills,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook,
        company,
        location,
        bio,
        status,
        githubusername
    } = req.body;
    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills){
        profileFields.skills = skills.split(',').map(skill => skill.trim());

    } 
    
    // Build social profile objects
    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin ;
    if(instagram) profileFields.social.instagram = instagram;

    try{
        let profile = await Profile.findOne({ user:req.user.id }, {});
        if(profile){
           // Update
           profile = await Profile.findOneAndUpdate(
               { user: req.user.id }, 
               { $set: profileFields },
               { $new: true });
           return res.json(profile);

        };
        profile = new Profile(profileFields);
        await profile.save();
        return res.json(profile);

    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
  
    return res.send('^^1^^')

});

// @route    GET api/profile/
// @desc     All profile list
// @access   Public
router.get('/', async (req, res) => {
    try{
        const profile = await Profile.find().populate('user', ['name', 'avatar']);

        if(!profile){
            return res.status(400).json({ msg: 'No profiles' })
        }
        res.json(profile);

    } catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user id
// @access   Public
router.get('/user/:user_id', async (req, res) => {
    try{
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if(!profile){
            return res.status(400).json({ msg: 'No profile for this user' })
        }

        res.json(profile);

    } catch(err){
        if(err.kind == 'ObjectId'){
            return res.status(400).json({ msg: 'No profile for this user' });
        }
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    Delete api/profile/
// @desc     Delete a profile
// @access   Private
router.delete('/', auth,async (req, res) => {
    try{
        // Remove the profile and the user
        await Profile.findOneAndRemove({ user: req.user_id });
        await User.findOneAndRemove({ _id: req.user_id });

        res.json({ msg: 'User deleted' });
        if(!profile){
            return res.status(400).json({ msg: 'No profiles' })
        }
        res.json(profile);

    } catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    Put api/profile/experience
// @desc     Put experience to a profile
// @access   Private
router.put('/experience', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),

]], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    };

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(newExp);
        await profile.save();

        res.json(profile);
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
        
    }


})
module.exports = router;
