(function () {
    var app = angular.module('app');

    app.controller('mainCtrlModal', function ($scope) {
        $scope.openModal = function () {
            $scope.modalOpen = true;
        };

        $scope.closeModal = function (response) {
            $scope.modalOpen = false;
            console.log('Modal closed ', response);
        };

        $scope.modalClosed = function (response) {
            $scope.closeModal('no');
        };
    });
}());