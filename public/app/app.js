(function () {
    var app = angular.module('app', []);

    app.controller('mainCtrl', function () {
        var vm = this;
        vm.user1 = {
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
            ]
        };

        vm.user2 = {
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
            ]
        };
    });

    app.directive('userInfoCard', function () {
        return {
            restrict: 'E',
            templateUrl: '/app/templates/userInfoCard.html',
            replace: false, //a root html element is required in the template
            scope: {// scope: false (shared) scope: true (inheritance) 
                //scope: {} (isolated) multiple directives with isolated scope 
                //on a same element will cause an exception
                user: '=',
                initialCollapsed: '@collapsed'
            },
            controllerAs: 'vm',
            bindToController: true,
            controller: function () {
                this.collapsed = this.initialCollapsed === 'true';

                this.knightme = function (user) {
                    user.rank = "knight";
                };

//                $scope.collapsed = false;
                this.collapse = function () {
                    this.collapsed = !this.collapsed;
                };

                this.removeFriend = function (friend) {
                    var idx = this.user.friends.indexOf(friend);
                    if (idx > -1) {
                        this.user.friends.splice(idx, 1);
                    }
                };
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