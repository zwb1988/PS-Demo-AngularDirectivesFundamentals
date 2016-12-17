(function () {
    var app = angular.module('app');

    app.controller('mainCtrlBasicTransclusion', function ($scope) {
        $scope.message = "This is a message";
        console.log('controller', $scope);
    });

    app.controller('innerCtrl', function ($scope) {
        console.log('inner controller', $scope);
    });

    app.directive('displayBox', function () {
        return {
            restrict: 'E',
            templateUrl: '/app/templates/displayBox.html',
            controller: function ($scope) {
                $scope.hidden = false;

                $scope.close = function () {
                    $scope.hidden = true;
                };

                $scope.message = "Hello World";
                console.log('directive', $scope);
            },
            transclude: true,
            scope: true
        };
    });
}());