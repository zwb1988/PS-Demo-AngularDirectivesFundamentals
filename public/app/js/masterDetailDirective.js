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

    app.factory('userListState', function () {
        return {
            selectedUser: null
        };
    });

    app.directive('masterUsers', function (userListState) {
        return {
            scope: {
                users: '=data'
            },
            templateUrl: '/app/templates/masterUsers.html',
            controller: function ($scope) {
                $scope.state = userListState;
                userListState.selectedUser = $scope.users[0];
            }
        };
    });

    app.directive('detailUsers', function (userListState) {
        return {
            scope: {
                users: '=data'
            },
            controller: function ($scope) {
                $scope.state = userListState;
            },
            templateUrl: '/app/templates/detailUsers.html'
        };
    });
}());