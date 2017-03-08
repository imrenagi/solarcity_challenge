
var SurveyService = require('../services/surveyservice');
var SurveyDAO = require('../models/surveydao');
var database = require('../services/database');

var verificationHandler = require('../utils/verificationhandler');

var surveyDAO = new SurveyDAO(database);
var surveyService = new SurveyService(surveyDAO);

exports.addSurvey = function(req, res, next) {
    var data = {
        name : req.body.name,
        age : req.body.age,
        sex : req.body.sex,
        address : req.body.address,
        isInterested : req.body.is_interested,
        reason : req.body.reason
    };

    var invalidFields = verificationHandler.verifySurveyForm(data);
	if (invalidFields.length >= 1) {
		var err = new Error();
	  	err.status = 400;
	  	if (invalidFields.length == 1) {
            err.message = "You didn't fill " + invalidFields[0] + " field. Please complete the form!";
		} else {
	  		err.message = "You didn't fill these following fields: " + invalidFields.join(", ") + ". Please complete the form!";
		}
	  	res.status(err.status).send(err);
	} else {
		surveyService.store(data).then(function(result) {
			res.send();  	
		}).catch(function(err) {
			next(err);
		});
	}
}

exports.getResultBySex = function(req, res, next) {
	surveyService.fetchResultBySex().then(function(result) {
		res.send(result);
	}).catch(function(err) {
		next(err);
	});
};

exports.getResultByAge = function(req, res, next) {
    surveyService.fetchResultByAge().then(function(result) {
        res.send(result);
    }).catch(function(err) {
        next(err);
    });
}
