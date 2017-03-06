var express = require('express');
var router = express.Router();
var ageController = require('../controllers/agecontroller');

router.use(function(req, res, next){
    res.setHeader('Content-Type', 'application/json');
    next();
})

router.get('/', ageController.getAges);

module.exports = router;