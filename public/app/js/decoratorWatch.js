(function () {
    var app = angular.module('app');

    app.controller('mainCtrlngWatch', function ($scope) {
        $scope.size = 150;
    });

    app.directive('fontScale', function () {
        return {
            link: function (scope, element, attributes) {
                scope.$watch(attributes['fontScale'], function (newValue, oldValue) {
                    element.css('font-size', newValue + '%');
                });
            }
        };
    });
}());