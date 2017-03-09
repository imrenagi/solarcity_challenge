var expect = require('expect.js');
var sinon = require('sinon');

var handler  = require('../../utils/verificationhandler');

suite('Verification Handler Test Suite', function() {

    test('Should include all invalid field if the data is empty', function() {
        var invalidFields = ["name","age", "sex", "address", "solar panel question", "reason"];
        var data = {};
        expect(invalidFields).to.eql(handler.verifySurveyForm(data));
    });

    test('Should return empty array if all data are given', function () {
        var invalidFields = [];
        var data = {
            name : "something",
            sex : 1,
            age : 2,
            address : "address",
            isInterested : true,
            reason : "this is a reason"
        };
        expect(invalidFields).to.eql(handler.verifySurveyForm(data));
    });

    test('Should return array with two element if two fields are missing', function () {
        var invalidFields = ["name", "sex"];
        var data = {
            age : 2,
            address : "address",
            isInterested : true,
            reason : "this is a reason"
        };
        expect(invalidFields).to.eql(handler.verifySurveyForm(data));
    });

    test('Should return array with one element if on fields is missing', function () {
        var invalidFields = ["name"];
        var data = {
            sex : 1,
            age : 2,
            address : "address",
            isInterested : true,
            reason : "this is a reason"
        };
        expect(invalidFields).to.eql(handler.verifySurveyForm(data));
    });

    test('Should return several invalid fields resulted from wrong data type', function () {
        var invalidFields = ["age", "sex"];
        var data = {
            name : "something",
            sex : "1",
            age : "2",
            address : "address",
            isInterested : true,
            reason : "this is a reason"
        };
        expect(invalidFields).to.eql(handler.verifySurveyForm(data));
    });

    test('Should return a invalid field whose wrong type', function () {
        var invalidFields = ["sex"];
        var data = {
            name : "something",
            sex : "1",
            age : 2,
            address : "address",
            isInterested : true,
            reason : "this is a reason"
        };
        expect(invalidFields).to.eql(handler.verifySurveyForm(data));
    });

});
