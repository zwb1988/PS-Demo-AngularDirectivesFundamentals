(function () {
    var app = angular.module('app');

    app.controller('mainCtrlDecorator', function ($scope) {
        $scope.messages = [];
        $scope.handlePause = function (e) {
            console.log(e);
            $scope.messages.push({text: 'paused!'});
            console.log('paused!');
        };
    });

    app.directive('spacebarSupport', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attribute, controller) {
                var vidEl = element[0];
                $('body').on('keypress', function (event) {
                    if (event.keyCode === 32) {
                        if (vidEl.paused) {
                            vidEl.play();
                        } else {
                            vidEl.pause();
                        }
                    }
                });
            }
        };
    });

    app.directive('eventPause', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attribute, controller) {
                element.on('pause', function (event) {
                    var fn = $parse(attribute['eventPause']);
                    scope.$apply(function () {
                        fn(scope, {evt: event});
                    });
                });
            }
        };
    });
}());