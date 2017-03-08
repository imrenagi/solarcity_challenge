angular.module('surveyService', [])
	.factory('Survey', ['$http',function($http) {
		return {
			store : function(surveyData) {
				return $http.post('/survey', surveyData);
			},
			getResultBySex : function() {
				return $http.get('/survey/result');
			}
		}
	}]);