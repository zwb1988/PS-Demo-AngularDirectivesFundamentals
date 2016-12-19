(function () {
    var app = angular.module('app');

    app.controller('mainCtrlCompileDirective', function ($scope) {

    });

    app.directive('simpleDirective', function () {
        return {
            // controller etc...
            compile: function (elements, attributes) {
                // do some work
                return function (scope, elements, attributes, controller, transclude) {
                    // implementation
                };
            }
        };
    });
}());