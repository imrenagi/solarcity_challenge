"use strict";

class SurveyService {

	constructor(surveyDAO) {
		this.surveyDAO = surveyDAO;
	}

	store(surveyData) {
		return this.surveyDAO.save(surveyData);
	}

	fetchResultByAge() {
        var that = this;
        return this.surveyDAO.getResultGroupByAge().then(function(data) {
            var result = {};
            result.data = that.aggregateByAge(data);
            return result;
        });
	}

	aggregateByAge(res) {
		var keys = this.getUniqueAgeKey(res);
		console.log(keys.length);
		var interested = this.initArrayWithKey(keys.length);
		var notInterested = this.initArrayWithKey(keys.length);
		var total = 0;

        for(var i = 0; i < res.length; i++) {
            if (res[i].interested === 1) interested[res[i].id-1] = res[i].count;
            else if (res[i].interested === 0) notInterested[res[i].id-1] = res[i].count;
            total += res[i].count;
        }

        var result = {
            interested : interested,
            not_interested : notInterested,
            total : total,
            series: keys
        };
        return result;
	}

	initArrayWithKey(length) {
		var arr = [];
		for (var i=0; i<length; i++) {
			arr.push(0);
		}
		return arr;
	}

	getUniqueAgeKey(data) {
		var key = []; var flag = [];
		for (var i=0; i<data.length; i++) {
			if (flag[data[i].id]) continue;
			flag[data[i].id] = true;
			key.push(data[i].name);
		};
		return key;
	}

	fetchResultBySex() {
		var that = this;
		return this.surveyDAO.getResultGroupBySex().then(function(data) {
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