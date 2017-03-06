angular.module('utilService', [])
    .factory('Util', ['$http',function($http) {
        return {
            getAgeOptions : function() {
                return $http.get('/age');
            }
        }
    }]);