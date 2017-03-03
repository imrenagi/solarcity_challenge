angular.module('surveyController', [])

	.controller('formController', ['$scope','$http','Survey', function($scope, $http, Survey) {
		$scope.formData = {};
		$scope.loading = true;

		$scope.storeSurveyData = function() {
			if ($scope.formData.name != undefined) {
				$scope.loading = true;
				Survey.store($scope.formData)
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {};
					});
			}
		}
	}]);
	