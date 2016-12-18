(function () {
    var app = angular.module('app', []);

    app.controller('mainCtrl', function () {
        var vm = this;
        vm.person1 = {
            name: 'Luke Skywalker',
            address: {
                street: 'PO Box 123',
                city: 'Secret Rebel Base',
                planet: 'Yavin 4'
            },
            friends: [
                'Han',
                'Leia',
                'Chewbacca'
            ],
            level: 0
        };

        vm.person2 = {
            name: 'Han Solo',
            address: {
                street: 'PO Box 123',
                city: 'Mos Eisley',
                planet: 'Tattoine'
            },
            friends: [
                'Han',
                'Leia',
                'Chewbacca'
            ],
            level: 1
        };

        vm.droid1 = {
            name: 'R2-D2',
            specifications: {
                manufacturer: 'Industrial Automation',
                type: 'Astromech',
                productLine: 'R2 series'
            },
            level: 1
                    // owners...etc
        };
    });

    app.directive('userPanel', function () {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/app/templates/userPanel.html',
            scope: {
                name: '@',
                level: '=',
                initialCollapsed: '@collapsed'
            },
            controller: function ($scope) {
                $scope.collapsed = $scope.initialCollapsed === 'true';

                $scope.collapse = function () {
                    $scope.collapsed = !$scope.collapsed;
                };
                $scope.nextState = function (event) {
                    event.stopPropagation();
                    event.preventDefault();
                    $scope.level++;
                    $scope.level = $scope.level % 4;
                };
            }
        };
    });

    app.directive('personInfoCard', function () {
        return {
            restrict: 'E',
            templateUrl: '/app/templates/personInfoCard.html',
            replace: false, //a root html element is required in the template
            scope: {// scope: false (shared) scope: true (inheritance) 
                //scope: {} (isolated) multiple directives with isolated scope 
                //on a same element will cause an exception
                person: '=',
                initialCollapsed: '@collapsed'
            },
            controller: function ($scope) {
                $scope.knightme = function (person) {
                    person.rank = "knight";
                };

                $scope.removeFriend = function (friend) {
                    var idx = $scope.person.friends.indexOf(friend);
                    if (idx > -1) {
                        $scope.person.friends.splice(idx, 1);
                    }
                };
            }
        };
    });

    app.directive('droidInfoCard', function () {
        return {
            restrict: 'E',
            templateUrl: '/app/templates/droidInfoCard.html',
            replace: false, //a root html element is required in the template
            scope: {// scope: false (shared) scope: true (inheritance) 
                //scope: {} (isolated) multiple directives with isolated scope 
                //on a same element will cause an exception
                droid: '=',
                initialCollapsed: '@collapsed'
            },
            controller: function ($scope) {

            }
        };
    });

    app.directive('stateDisplay', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attributes, controller) {
                var params = attributes['stateDisplay'].split(' ');
                var linkVar = params[0];
                var classes = params.slice(1);
                scope.$watch(linkVar, function (newValue, oldValue) {
                    element.removeClass(classes.join(' '));
                    element.addClass(classes[newValue]);
                });
            }
        };
    });

    app.directive('removeFriend', function () {
        return {
            restrict: 'E',
            templateUrl: '/app/templates/removeFriend.html',
            scope: {
                notifyParent: '&method'
            },
            controller: function ($scope) {
                $scope.removing = false;
                $scope.startRemove = function () {
                    $scope.removing = true;
                };
                $scope.cancelRemove = function () {
                    $scope.removing = false;
                };
                $scope.confirmRemove = function () {
                    $scope.notifyParent();
                };
            }
        };
    });

    app.directive('address', function () {
        return {
            restrict: 'E',
            templateUrl: '/app/templates/address.html',
            scope: true,
            controller: function ($scope) {
                $scope.collapsed = false;
                $scope.collapseAddress = function () {
                    $scope.collapsed = true;
                };

                $scope.expandAddress = function () {
                    $scope.collapsed = false;
                };
            }
        };
    });
}());