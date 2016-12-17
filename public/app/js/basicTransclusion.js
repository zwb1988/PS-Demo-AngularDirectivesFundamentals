(function () {
    var app = angular.module('app');

    app.controller('mainCtrlBasicTransclusion', function ($scope) {
        $scope.message = "This is a message";
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
            },
            transclude: true
        };
    });
}());