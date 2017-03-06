angular.module('surveyController', ['ui.bootstrap'])

	.controller('formController', ['$scope','$http', '$modal','Survey', 'Util', function($scope, $http, $modal, Survey, Util) {
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
					    $scope.openErrorDialog(data.message);
                });
		}

        $scope.openErrorDialog = function (errMessage) {
            $modal.open({
                templateUrl: 'templates/errorpopup.html',
                controller: 'ErrorPopupCont',
                resolve: {
                    msg: function () {
                        return errMessage;
                    }
                }
            });
        }
	}])
    .controller('ErrorPopupCont',function ($scope, $modalInstance, msg) {
        $scope.content = msg;
        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        }});
	