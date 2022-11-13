const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const tourController = require('../controllers/tourController');

const { getAllTours,newTour,getSpecificTour,updateTour,deleteTour, aliasTopTours } = tourController;

router.route('/top-5-tours').get(aliasTopTours, getAllTours)

router.route('/').get(getAllTours).post(jsonParser, newTour)

router.route('/:id').get(getSpecificTour).patch(jsonParser, updateTour).delete(deleteTour)

module.exports = router;