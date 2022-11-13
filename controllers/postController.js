const APIFeatures = require('../utils/APIFeatures');
const Post = require('../models/postModel');

//const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
exports.aliasTopTours = (req, res, next) => {
	req.query.limit = '5';
	req.query.sort = '-ratingsAverage,price';
	req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
	next();
}

exports.getAllPosts = async (req, res) => {
	try{
		// const queryObj = {...req.query};
		// console.log(queryObj);
		// const excludedFields = ['page', 'sort', 'limit', 'fields'];
		// excludedFields.forEach(el => delete queryObj[el]);

		// const queryStr = JSON.stringify(queryObj).replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

		// let query = Post.find(JSON.parse(queryStr));


		// 2) SORTING

		// if(req.query.sort){
		// const sortBy = req.query.sort.split(',').join(' ');
		// query.sort(sortBy);
		// } else {
		// 	query = query.sort('-createdAt');
		// }

		// 3) FIELD LIMITING

		// if(req.query.fields){
		// 	const fields = req.query.fields.split(',').join(' ');
		// 	query = query.select(fields);
		// } else {
		// 	query = query.sort('-__v');
		// }

		// 4) PAGINATION
		// const page = Number(req.query.page) || 1;
		// const limit = Number(req.query.limit) || 100;
		// const skip = (page - 1) * limit;

		// query = query.skip(skip).limit(limit);

		// if (req.query.page) {
		// 	const numTours = await Post.countDocuments();
		// 	if (skip >= numTours) {
		// 		throw new error('this page does not exist');
		// 	}
		// }


		//EXECUTE QUERY
		const features = new APIFeatures(Post.find(), req.query)
			.filter()
			.sort()
			.limitFields()
			.paginate();

		const posts = await features.query;

	
		res.status(200).json({
			status:'success',
			results:posts.length,
			data: {
				posts
			}
		})	
	} catch(err) {
		res.status(404).json({
			status:'failed',
			message:err
		})
	}
}
// exports.getSpecificPost = async (req, res) => {
// 	const Post = await Post.findById(req.params.id)
// 	try{
// 		res.status(201).json({
// 			status:'success',
// 			data:{
// 				Post
// 			}
// 		})
// 	} catch (err) {
// 		res.status(404).json({
// 			status:'failed',
// 			message: 'Message not found'
// 		})
// 	}
// }
exports.newPost = async (req,res) => {
	try{
		const newPost = await Post.create(req.body)
		res.status(201).json({
		status:'success',
		data:{
			newPost
		}
	})
	} catch (err) {
		res.status(400).json({
			status:'failed',
			message:err
		})
	}
}
// exports.updatePost = async (req, res) => {
// 	try{
// 		const Post = await Post.findByIdAndUpdate(req.params.id, req.body, {
// 			new:true,
// 			runValidators:true
// 		})
// 		res.status(201).json({
// 			status:'success',
// 			data:{
// 				Post
// 			}
// 		})
// 	} catch (err) {
// 		res.status(404).json({
// 			status:'failed',
// 			message: err
// 		})
// 	}
// }
// exports.deletePost = async (req, res) => {
// 	try {
// 		const id = Number(req.params.id);
// 		await Post.findByIdAndDelete(id);
// 		res.status(204).json({
// 			status:'success',
// 			data: null
// 		})
// 	} catch(err) {
// 		res.status(404).json({
// 			status:'failed',
// 			message: err
// 		})
// 	}
// }


