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
            console.log($scope.formData);
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
	