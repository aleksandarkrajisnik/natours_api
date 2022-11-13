const APIFeatures = require('../utils/APIFeatures');
const Tour = require('../models/tourModel');

//const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
exports.aliasTopTours = (req, res, next) => {
	req.query.limit = '5';
	req.query.sort = '-ratingsAverage,price';
	req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
	next();
}

exports.getAllTours = async (req, res) => {
	try{
		// const queryObj = {...req.query};
		// console.log(queryObj);
		// const excludedFields = ['page', 'sort', 'limit', 'fields'];
		// excludedFields.forEach(el => delete queryObj[el]);

		// const queryStr = JSON.stringify(queryObj).replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

		// let query = Tour.find(JSON.parse(queryStr));


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
		// 	const numTours = await Tour.countDocuments();
		// 	if (skip >= numTours) {
		// 		throw new error('this page does not exist');
		// 	}
		// }


		//EXECUTE QUERY
		const features = new APIFeatures(Tour.find(), req.query)
			.filter()
			.sort()
			.limitFields()
			.paginate();

		const tours = await features.query;

	
		res.status(200).json({
			status:'success',
			results:tours.length,
			data: {
				tours
			}
		})	
	} catch(err) {
		res.status(404).json({
			status:'failed',
			message:err
		})
	}
}
exports.getSpecificTour = async (req, res) => {
	const tour = await Tour.findById(req.params.id)
	try{
		res.status(201).json({
			status:'success',
			data:{
				tour
			}
		})
	} catch (err) {
		res.status(404).json({
			status:'failed',
			message: 'Tour not found'
		})
	}
}
exports.newTour = async (req,res) => {
	try{
		const newTour = await Tour.create(req.body)
		res.status(201).json({
		status:'success',
		data:{
			newTour
		}
	})
	} catch (err) {
		res.status(400).json({
			status:'failed',
			message:err
		})
	}
}
exports.updateTour = async (req, res) => {
	try{
		const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
			new:true,
			runValidators:true
		})
		res.status(201).json({
			status:'success',
			data:{
				tour
			}
		})
	} catch (err) {
		res.status(404).json({
			status:'failed',
			message: err
		})
	}
}
exports.deleteTour = async (req, res) => {
	try {
		const id = Number(req.params.id);
		await Tour.findByIdAndDelete(id);
		res.status(204).json({
			status:'success',
			data: null
		})
	} catch(err) {
		res.status(404).json({
			status:'failed',
			message: err
		})
	}
}


