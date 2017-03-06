"use strict";

class SurveyDAO {

	constructor(db) {
		this.db = db;
	}

	save(surveyResult) {
		var values = [surveyResult.name, surveyResult.address, surveyResult.age, surveyResult.isInterested ? 1 : 0, surveyResult.reason];
		var query = 'INSERT INTO survey (name, address, age, interested, reason) values (?,?,?,?,?)';

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

}

module.exports = SurveyDAO;