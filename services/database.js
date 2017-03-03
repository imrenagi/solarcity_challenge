var mysql = require('mysql');

var DB = process.env.DB_NAME; 

var state = {
	pool: null
};

exports.connect = function(done) {
	state.pool = mysql.createPool({
		host: process.env.DB_HOST || 'localhost',
		user: process.env.DB_USER || 'root',
		password: process.env.DB_PASSWORD || '',
		database: DB
	});
	done();
}

exports.get = function(){
	return state.pool
}
