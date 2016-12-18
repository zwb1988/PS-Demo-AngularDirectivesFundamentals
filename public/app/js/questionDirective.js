(function () {
    var app = angular.module('app');

    app.controller('mainCtrlQuestionDirective', function ($scope) {
        $scope.answers = {baseLocation: 'Yavin 4'};
        console.log('MainController', $scope);
    });

    app.directive('myQuestion', function () {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/app/templates/myQuestion.html',
            scope: {
                questionText: '@q'
            }
        };
    });
}());