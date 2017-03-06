angular.module('surveyController', ['ui.bootstrap'])

	.controller('formController', ['$scope','$http','Survey', 'Util', function($scope, $http, Survey, Util) {
		$scope.formData = {};
		$scope.ages = [];
		$scope.loading = true;

		Util.getAgeOptions()
			.success(function(data) {
                $scope.ages = data.ages;
			});

		$scope.storeSurveyData = function() {
				$scope.loading = true;
				Survey.store($scope.formData)
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {};
					}).error(function(data, code) {
					    console.log(data);
					    console.log(code);
                });
		}
	}]);
	