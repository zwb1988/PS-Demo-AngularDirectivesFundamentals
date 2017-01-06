(function () {
    var app = angular.module('app');

    app.controller('mainCtrlMasterDetail', function ($scope) {
        $scope.users = [
            {name: 'Luke', planet: 'Tatooine', job: 'Jedi'},
            {name: 'Han', planet: 'Nowhere', job: 'Jedi'},
            {name: 'Chewbacca', planet: 'Kashyyyk', job: 'CoPilot'}
        ];
        $scope.selectedUser = null;
    });

    app.directive('masterUsers', function () {
        return {
            scope: {
                users: '=data',
                selectedUser: '='
            },
            templateUrl: '/app/templates/masterUsers.html',
            controller: function ($scope) {
                $scope.selectedUser = $scope.users[0];

                $scope.selectUser = function (user) {
                    $scope.selectedUser = user;
                };
            }
        };
    });

    app.directive('detailUsers', function () {
        return {
            scope: {
                users: '=data',
                selectedUser: '='
            },
            templateUrl: '/app/templates/detailUsers.html'
        };
    });
}());