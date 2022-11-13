const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

app.use(express.static(`${__dirname}/public`))

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
})

module.exports = app;