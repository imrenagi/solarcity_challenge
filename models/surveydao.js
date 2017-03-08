"use strict";

class SurveyDAO {

	constructor(db) {
		this.db = db;
	}

	save(surveyResult) {
		var values = [surveyResult.name, surveyResult.address, surveyResult.age, 
			surveyResult.sex, surveyResult.isInterested,
			surveyResult.reason];

		var query = 'INSERT INTO survey (name, address, age, sex, interested, reason) values (?,?,?,?,?,?)';
		console.log();
		var that = this;
		return new Promise(function(resolve, reject) {
			that.db.get().query(query, values, function(err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result.insertId);
				}
			});
		});
	}

	getResult() {
		var query = 'select sex, interested, count(*) count from survey group by interested, sex';
		var that = this;
		return new Promise(function(resolve, reject) {
			that.db.get().query(query, function(err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}

}

module.exports = SurveyDAO;