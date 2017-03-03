var express = require('express');
var router = express.Router();
var surveyController = require('../controllers/surveycontroller');

router.use(function(req, res, next){
  res.setHeader('Content-Type', 'application/json');
  next();
})

router.post('/', surveyController.addSurvey);

module.exports = router;