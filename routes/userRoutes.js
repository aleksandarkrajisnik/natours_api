const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const userController = require('../controllers/userController');

const { getAllUsers, createUser, getSpecificUser, updateUser, deleteUser } = userController;

router.route('/').get(getAllUsers).post(jsonParser, createUser);
router.route('/:id').get(getSpecificUser).patch(jsonParser, updateUser).delete(deleteUser);

module.exports = router;
