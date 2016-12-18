(function () {
    var app = angular.module('app');

    app.controller('mainCtrlStructural', function ($scope) {
        $scope.items = [1, 3, 6, 78];
    });

    app.directive('myTransclude', function () {
        return {
            restrict: 'A',
            transclude: 'element',
            link: function (scope, element, attributes, controller, transclude) {
                transclude(scope, function (clone) {
                    element.after(clone);
                });
            }
        };
    });
}());