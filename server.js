const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'})

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASS);

mongoose.connect(DB);

const port = 3000;
app.listen(port, () => {
	console.log('Server running...');
})