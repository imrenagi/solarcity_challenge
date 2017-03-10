var expect = require('expect.js');
var sinon = require('sinon');

var SurveyDAO = require('../../models/surveydao');
var surveyDAO = new SurveyDAO();

var SurveyService  = require('../../services/surveyservice');

var surveyService = new SurveyService(surveyDAO);
var surveyDAOMock = sinon.mock(surveyDAO);

suite('Survey Service Test Suite', function() {

    test('Aggregate by sex should return wrap the data with data key', function (done) {

        surveyDAOMock.expects('getResultGroupBySex').returns(
            Promise.resolve(
                [{ sex: 1, interested: 0, count: 1 },
                { sex: 2, interested: 0, count: 1 },
                { sex: 1, interested: 1, count: 15 },
                { sex: 2, interested: 1, count: 10 }]
            )
        );

        var expectedResult = {
            data : {
                interested:[15,10],
                not_interested:[1,1],
                total:27,
                series:["Male","Female"]
            }
        };

        surveyService.fetchResultBySex().then(function(data) {
            expect(expectedResult).to.be.eql(data);
            surveyDAOMock.verify();
            surveyDAOMock.restore();
            done();
        }).catch(function(err) {
            done(err);
        })

    });

    test('Init Array with a length should return correct array', function() {
        expect([]).to.be.eql(surveyService.initArrayWithKey(0));
        expect([0]).to.be.eql(surveyService.initArrayWithKey(1));
        expect([0,0]).to.be.eql(surveyService.initArrayWithKey(2));
    });

    test('Data whose Unique Age name should return unique age name', function() {
       var inputData = [{id: 1, name :'Below 20'},
           {id: 2, name :'20 to 30'},
           {id: 3, name :'30 to 40'}
           ];
       var expectedArr = ['Below 20', '20 to 30', '30 to 40'];

       expect(expectedArr).to.be.eql(surveyService.getUniqueAgeKey(inputData));
    });

    test('Data whose duplicate age name should return unique age name', function() {
        var inputData = [{id: 1, name :'Below 20'},
            {id: 2, name :'20 to 30'},
            {id: 2, name :'20 to 30'},
            {id: 3, name :'30 to 40'}
        ];
        var expectedArr = ['Below 20', '20 to 30', '30 to 40'];

        expect(expectedArr).to.be.eql(surveyService.getUniqueAgeKey(inputData));
    });

    test('Empty data should return empty unique age name array', function() {
        var inputData = [];
        expect(surveyService.getUniqueAgeKey(inputData)).to.be.empty();
    });

    test('Aggregate By Sex should return zero values if the data given by db is empty', function() {
        var interested = [0,0];
        var notInterested = [0,0];

        var result = surveyService.aggregateBySex([]);
        expect(interested).to.be.eql(result.interested);
        expect(notInterested).to.be.eql(result.not_interested);
        expect(0).to.be.eql(result.total);
    });

    test('Aggregate By Sex should return correct values if the data is valid', function() {
        var data = [ { sex: 1, interested: 0, count: 1 },
        { sex: 2, interested: 0, count: 1 },
        { sex: 1, interested: 1, count: 15 },
        { sex: 2, interested: 1, count: 10 }];

        var interested = [15,10];
        var notInterested = [1,1];

        var result = surveyService.aggregateBySex(data);
        expect(interested).to.be.eql(result.interested);
        expect(notInterested).to.be.eql(result.not_interested);
        expect(27).to.be.eql(result.total);
    });


    test('Aggregate By age should return correct zero values if db has no records', function() {
        data = [  { id: 1, name: 'Below 20', interested: null, count: null },
            { id: 2, name: 'Between 20 and 29', interested: null, count: null },
            { id: 3, name: 'Between 30 and 34', interested: null, count: null },
            { id: 4, name: 'Between 35 and 39', interested: null, count: null },
            { id: 5, name: 'Between 40 and 49', interested: null, count: null },
            { id: 6, name: 'Above 50', interested: null, count: null } ]

        var interested = [0,0,0,0,0,0];
        var notInterested = [0,0,0,0,0,0];
        var result = surveyService.aggregateByAge(data);

        expect(interested).to.be.eql(result.interested);
        expect(notInterested).to.be.eql(result.not_interested);
        expect(0).to.be.eql(result.total);
    });

    test('Aggregate By age should return correct aggregation value', function() {
        data = [  { id: 1, name: 'Below 20', interested: 0, count: 1 },
            { id: 1, name: 'Below 20', interested: 1, count: 5 },
            { id: 2, name: 'Between 20 and 29', interested: 1, count: 12 },
            { id: 3, name: 'Between 30 and 34', interested: 0, count: 1 },
            { id: 3, name: 'Between 30 and 34', interested: 1, count: 5 },
            { id: 4, name: 'Between 35 and 39', interested: null, count: null },
            { id: 5, name: 'Between 40 and 49', interested: 1, count: 1 },
            { id: 6, name: 'Above 50', interested: 1, count: 2 } ]

        var interested = [5,12,5,0,1,2];
        var notInterested = [1,0,1,0,0,0];

        var result = surveyService.aggregateByAge(data);
        expect(interested).to.be.eql(result.interested);
        expect(notInterested).to.be.eql(result.not_interested);
        expect(27).to.be.eql(result.total);
    });

});
