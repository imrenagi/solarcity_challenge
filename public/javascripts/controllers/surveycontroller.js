angular.module('surveyController', ['ui.bootstrap',  'chart.js'])

	.controller('formController', ['$scope','$http', '$modal','Survey', 'Util', function($scope, $http, $modal, Survey, Util) {
		$scope.formData = {};
		$scope.ages = [];
		$scope.loading = true;

        $scope.labels = ['2006', '2007', ];
        $scope.series = ['Series A', 'Series B'];

        $scope.data = [
            [65, 59],
            [28, 48]
        ];

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
					    console.log(data);
					    console.log(code);
                    	$scope.openResultDialog();
					    // $scope.openErrorDialog(data.message);
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

    	Survey.getResultBySex().success(function(data) {
    		console.log("test");
            console.log(data);
            $scope.sexLabel = data.data.series;
            $scope.sexData = [
                data.data.interested,
                data.data.not_interested
            ];
        });

        $scope.series = ['Interested', 'Not Interested'];

        $scope.ageLabel = ['Below 20', 'Between 20 and 29', 'Between 30 and 39', 'Between 40 and 49',
            'Above 50'];
        $scope.ageData = [
            [2, 4, 6, 9, 3],
            [2, 4, 6, 9, 8]
        ];

        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        }}]);
    // .controller('ResultPopupCont',function ($scope, $modalInstance) {
    //
    //     $scope.series = ['Interested', 'Not Interested'];
    //
    //     $scope.sexLabel = ['Male', 'Female' ];
    //
    //
    //     $scope.sexData = [
    //         [65, 59],
    //         [28, 0]
    //     ];
    //
    //     $scope.ageLabel = ['Below 20', 'Between 20 and 29', 'Between 30 and 39', 'Between 40 and 49',
		// 	'Above 50'];
    //     $scope.ageData = [
    //     		[2, 4, 6, 9, 3],
		// 		[2, 4, 6, 9, 8]
		// 	];
    //
    //     $scope.close = function () {
    //         $modalInstance.dismiss('cancel');
    //     }});

//Surver
// getResultBySex
	