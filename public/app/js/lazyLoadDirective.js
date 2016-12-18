(function () {
    var app = angular.module('app');

    app.controller('mainCtrlLazyLoad', function ($scope) {
        $scope.items = [2, 5, 23, 253];
    });

    app.directive('myLazyRender', function () {
        return {
            restrict: 'A',
            transclude: 'element',
            priority: 1200,
            link: function (scope, elements, attributes, controller, transclude) {
                var hasBeenShown = false;
                var unwatchFn = scope.$watch(attributes['myLazyRender'], function (newValue) {
                    if (newValue && !hasBeenShown) {
                        hasBeenShown = true;
                        transclude(scope, function (clone) {
                            elements.after(clone);
                        });
                        unwatchFn();
                    }
                });
            }
        };
    });

    app.directive('echo', function () {
        return {
            priority: 1300,
            link: function () {
                console.log('echo');
            }
        };
    });
}());