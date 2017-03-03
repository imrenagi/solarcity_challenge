
var SurveyService = require('../services/surveyservice');
var SurveyDAO = require('../services/surveydao');
var database = require('../services/database');

var surveyDAO = new SurveyDAO(database);
var surveyService = new SurveyService(surveyDAO);

exports.addSurvey = function(req, res, next) {
	var name = req.body.name;
	var age = req.body.age;
	var sex = req.body.sex;
	var address = req.body.address;
	var isInterested = req.body.is_interested;
	var reason = req.body.reason;

	if (name === undefined || age === undefined || sex === undefined
		|| address === undefined || reason === undefined) {
		var err = new Error();
	  	err.status = 400;
	  	err.message = "Invalid request!";
	  	next(err);
	  	
	} else {
		var data = {
			name : name,
			age : age,
			sex : sex,
			address : address,
			isInterested : isInterested,
			reason : reason
		};

		surveyService.store(data).then(function(result) {
			res.send();  	
		}).catch(function(err) {
			next(err);
		});
	}
}
