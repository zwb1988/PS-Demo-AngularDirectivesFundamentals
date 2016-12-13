(function () {
    var app = angular.module('app', []);

    app.controller('mainCtrl', function () {
        var vm = this;
        vm.user = {
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
    });

    app.directive('userInfoCard', function () {
        return {
            restrict: 'E',
            templateUrl: '/app/templates/userInfoCard.html',
            replace: false //a root html element is required in the template
        };
    });
}());