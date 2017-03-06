var UtilService = require('../services/utilservice');
var AgeDAO = require('../models/agedao');
var database = require('../services/database');

var ageDAO = new AgeDAO(database);
var utilService = new UtilService(ageDAO);

exports.getAges = function(req, res, next) {
    utilService.getAgeOptions().then(function(data) {
        res.send({ages : data});
    }).catch(function(err){
        next(err);
    })
}
