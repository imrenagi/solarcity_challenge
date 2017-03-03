"use strict";

class SurveyService {

	constructor(surveyDAO) {
		this.surveyDAO = surveyDAO;
	}

	store(surveyData) {
		return this.surveyDAO.save(surveyData);
	}

}

module.exports = SurveyService;