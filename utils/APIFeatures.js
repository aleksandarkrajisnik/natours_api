class APIFeatures {
	constructor(query, queryString){
		this.query = query;
		this.queryString = queryString;
	}

	filter() {
		// 1A) Filtering
		const queryObj = {...this.queryString};
		console.log(queryObj);
		const excludedFields = ['page', 'sort', 'limit', 'fields'];

		// 1B) Advanced Filtering
		excludedFields.forEach(el => delete queryObj[el]);
		const queryStr = JSON.stringify(queryObj).replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

		this.query.find(JSON.parse(queryStr))
		//let query = Tour.find(JSON.parse(queryStr));

		return this;
	}

	sort() {
		if(this.queryString.sort){
			const sortBy = this.queryString.sort.split(',').join(' ');
			this.query = this.query.sort(sortBy);
		} else {
			this.query = this.query.sort('-createdAt');
		}

		return this;
	}

	limitFields() {
		if(this.queryString.fields){
			const fields = this.queryString.fields.split(',').join(' ');
			this.query = this.query.select(fields);
		} else {
			this.query = this.query.sort('-__v');
		}
		return this;
	}

	paginate() {
		const page = Number(this.queryString.page) || 1;
		const limit = Number(this.queryString.limit) || 100;
		const skip = (page - 1) * limit;

		this.query = this.query.skip(skip).limit(limit);

		return this;
	}
}

module.exports = APIFeatures;