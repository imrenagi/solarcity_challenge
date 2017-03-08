var express = require('express');
var router = express.Router();
var surveyController = require('../controllers/surveycontroller');

router.use(function(req, res, next){
  res.setHeader('Content-Type', 'application/json');
  next();
})

router.post('/', surveyController.addSurvey);
router.get('/result/sex', surveyController.getResultBySex);
router.get('/result/age', surveyController.getResultByAge);

module.exports = router;