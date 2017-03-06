"use strict";

class UtilService {

    constructor(ageDAO) {
        this.ageDAO = ageDAO;
    }

    getAgeOptions() {
        return this.ageDAO.getAll();
    }
}

module.exports = UtilService;
