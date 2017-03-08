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
			result.data = that.aggregateBySex(data);
			return result;
		});
	}

	aggregateBySex(res) {
		var interested = [0, 0];
		var notInterested = [0, 0];
		var total = 0;
		
		for(var i = 0; i < res.length; i++) {
			if (res[i].sex === 1) {
				if (res[i].interested === 1) interested[0] = res[i].count;
				else notInterested[0] = res[i].count;
			} else {
                if (res[i].interested === 1) interested[1] = res[i].count;
                else notInterested[1] = res[i].count;
			}
            total += res[i].count;
		}

		var result = {
			interested : interested,
			not_interested : notInterested,
			total : total,
			series: ['Male', 'Female']
		};
		return result;
	}

}

module.exports = SurveyService;