"use strict";

class SurveyService {

	constructor(surveyDAO) {
		this.surveyDAO = surveyDAO;
	}

	store(surveyData) {
		return this.surveyDAO.save(surveyData);
	}

	fetchResult() {
		var that = this;
		return this.surveyDAO.getResult().then(function(data) {
			var result = {};
			result.groupby_sex = that.aggregateBySex(data);
			result.total = data.length;
			return result;
		});
	}

	aggregateBySex(res) {
		var result = {};
		result.male = {
			interested: 0,
			not_interested:0
		}
		result.female = {
			interested: 0,
			not_interested:0	
		}
		
		for(var i = 0; i < res.length; i++) {
			if (res[i].interested === 1) {
				if (res[i].sex === 1) {
					result.male.interested++;
				} else {
					result.female.interested++;
				}
			} else {
				if (res[i].sex === 1) {
					result.male.not_interested++;
				} else {
					result.female.not_interested++;
				}
			}
		}
		return result;
	}

}

module.exports = SurveyService;