(function () {
    var app = angular.module('app');

    app.controller('mainCtrlngBusinessSpecific', function ($scope) {
        $scope.user1 = {
            name: "Luke",
            selected: false
        };
    });

    app.directive('userTile', function () {
        return {
            restrict: 'E',
            scope: {
                user: '='
            },
            templateUrl: '/app/templates/userTile.html'
        };
    });

    app.directive('userClickSelect', function () {
        return {
            link: function (scope, element, attributes) {
                element.on('click', function () {
                    scope.user.selected = !scope.user.selected;
                    scope.$apply();
                });
            }
        };
    });
}());