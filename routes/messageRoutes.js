const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const postController = require('../controllers/postController');

//const { getAllPosts,newPost,getSpecificPost,updatePost,deletePost, aliasTopTours } = postController;
const { getAllPosts,newPost, aliasTopTours } = postController;
router.route('/top-5-tours').get(aliasTopTours, getAllPosts)

router.route('/').get(getAllPosts).post(jsonParser, newPost)

// router.route('/:id').get(getSpecificPost).patch(jsonParser, updatePost).delete(deletePost)

module.exports = router;