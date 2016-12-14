(function () {
    var app = angular.module('app');

    app.controller('mainCtrlngClick', function ($scope) {
        $scope.data = {
            message: 'I have not been clicked'
        };

        $scope.clickHandler = function (p) {
            p.message = 'I have been clicked';
        };
    });

    app.directive('myClick', function ($parse) {
        return {
            link: function (scope, element, attributes, controller) {
                var fn = $parse(attributes['myClick']);
                element.on('click', function (event) {
                    scope.$apply(function () {
                        fn(scope);
                    });
                });
            }
        };
    });
}());