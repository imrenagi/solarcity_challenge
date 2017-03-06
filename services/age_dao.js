"use strict";

class AgeDAO {

    constructor(db) {
        this.db = db;
    }

    getAll() {
        var query = 'SELECT id, name FROM ages';

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

module.exports = AgeDAO;
