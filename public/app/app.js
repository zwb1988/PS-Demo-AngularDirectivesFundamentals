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
            ],
            hasForce: true,
            yearsOfJediTraining: 4,
            master: 'Yoda',
            passedTrials: true,
            masterApproves: true
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

    app.factory('jediPolicy', function ($q) {
        return {
            advanceToKnight: function (candidate) {
                var promise = $q(function (resolve, reject) {
                    if (candidate.hasForce
                            && (candidate.yearsOfJediTraining > 20
                                    || candidate.isChosenOne
                                    || (candidate.master === 'Yoda'
                                            && candidate.yearsOfJediTraining > 3))
                            && candidate.masterApproves && candidate.passedTrials) {
                        candidate.rank = "Jedi Knight";
                        resolve(candidate);
                    } else {
                        reject(candidate);
                    }
                });
                return promise;
            }
        };
    });

    app.directive('userInfoCard', function (jediPolicy) {
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
                this.showKnightModal = false;

                this.knightModalDone = function (response, user) {
                    if (response) {
                        jediPolicy.advanceToKnight(user).then(null, function (user) {
                            alert('Sorry ' + user.name + ' is not ready to become a Jedi Knight.');
                        });
                    }
                    this.showKnightModal = false;
                };

                this.knightme = function (user) {
                    this.showKnightModal = true;
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