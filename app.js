const express = require('express');
const morgan = require('morgan');
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();
app.use(express.static(`${__dirname}/public`))
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
})

app.get('/', (req, res) => {
	res.sendStatus(200)
  })

module.exports = app;