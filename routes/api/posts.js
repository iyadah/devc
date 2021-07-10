const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile')

// @route    Post api/posts
// @desc     Add post
// @access   Private
router.post('/', [ auth, 
                check('text', 'Text is required').not().isEmpty() ], 
       async (req,res) => {
       const errors = validationResult(req);
       if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
       }

       try {
            const user = await User.findById(req.user.id).select('-password');
            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            });

        const post = await newPost.save();
        res.json(post);
            
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error');
            
        }

});


// @route    Get api/posts
// @desc     Get all posts
// @access   Private
router.get('/', auth, async (req,res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }

});

// @route    Get api/posts
// @desc     Get post by id
// @access   Private
router.get('/:id', auth, async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
        if(!post){
            return res.status(404).send('Post not found');
        }
    } catch (err) {
        console.log(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).send('Post not found');   
        }
        res.status(500).send('Server error');
    }

});

// @route    Delete api/posts
// @desc     Delete post by id
// @access   Private
router.delete('/:id', auth, async (req,res) => {
    try {
        //Check on the user
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).send('Post not found');
        }
        if(post.user.toString() !== req.user.id){
            return res.status(401).send('Not authorized');
        }



        post.remove();
        res.json({ msg: 'Post removed'} );
    } catch (err) {
        console.log(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).send('Post not found');   
        }
        res.status(500).send('Server error');
    }

});

// @route    Like api/posts/like/:id
// @desc     Like post 
// @access   Private
router.put('/like/:id', auth, async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).send('Post not found');
        }

        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0 ){
            return res.status(400).json({ msg: 'Post is already liked'});
        }

        post.likes.unshift({ user: req.user.id });
        await post.save();
        res.json(post.likes);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');        
    }
});

// @route    Unlike api/posts/unlike/:id
// @desc     Unlike post 
// @access   Private
router.put('/unlike/:id', auth, async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).send('Post not found');
        }

        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0 ){
            return res.status(400).json({ msg: 'Post has not yet been liked'});
        }

        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);
        await post.save();
        res.json(post.likes);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');        
    }
});

// @route    Post api/posts/comment/:id
// @desc     Add comment to a post
// @access   Private
router.post('/comment/:id', [ auth, 
    check('text', 'Text is required').not().isEmpty() ], 
    async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }

        post.comments.unshift(newComment);
        await post.save();
        res.json(post.comments);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');

    }

});

// @route    Delete api/posts/comment/:id/:comment_id
// @desc     Delete comment from a post
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id);
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);
        if(!comment){
            return res.status(404).send('Comment does not exist');
        }
        
        if(comment.user.toString() !== req.user.id){
            return res.status(401).send('User not authorized');
        }
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        post.comments.splice(removeIndex, 1);
        await post.save();
        res.json(post.comments);
        
    } catch (error) {
        console.log(err.message);
        res.status(500).send('Server error');    
    }

});

module.exports = router;
