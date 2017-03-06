"use strict";

class SurveyDAO {

	constructor(db) {
		this.db = db;
	}

	save(surveyResult) {
		var values = [surveyResult.name, surveyResult.address, surveyResult.age, 
			surveyResult.sex, surveyResult.isInterested ? 1 : 0, 
			surveyResult.reason];

		var query = 'INSERT INTO survey (name, address, age, sex, interested, reason) values (?,?,?,?,?,?)';

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
		var query = 'SELECT id, age, sex, interested FROM survey';
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