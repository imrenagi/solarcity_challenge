angular.module('surveyController', ['ui.bootstrap',  'chart.js'])

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
						$scope.openResultDialog();
					}).error(function(data, code) {
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

        $scope.openResultDialog = function() {
			$modal.open({
				templateUrl: 'templates/resultpopup.html',
				controller: 'ResultPopupCont',
				resolve: {

				}
			})
		}
	}])

    .controller('ErrorPopupCont',function ($scope, $modalInstance, msg) {
        $scope.content = msg;
        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        }})
    .controller('ResultPopupCont', ['$scope', '$modalInstance','Survey', function ($scope, $modalInstance, Survey) {

        $scope.series = ['Interested', 'Not Interested'];

    	Survey.getResultBySex().success(function(data) {
            $scope.sexLabel = data.data.series;
            $scope.sexData = [
                data.data.interested,
                data.data.not_interested
            ];
        });

    	Survey.getResultByAge().success(function(data) {
            $scope.ageLabel = data.data.series;
            $scope.ageData = [
                data.data.interested,
                data.data.not_interested
            ];
		})

        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        }}]);