const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'A post must have a title'],
		unique: true
	},
	description: {
		type: String,
		required: [true, 'A post must have a description']
	},
	imageUrl: {
		type: String,
		required: [true, 'A post must have an image']
	}
})

const Post = new mongoose.model('Post', postSchema);

module.exports = Post;