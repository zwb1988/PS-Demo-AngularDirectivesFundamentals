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

    app.controller('modalCtrl', function ($scope) {
        $scope.close = function (response) {
            $scope.closeModal(response);
        };
    });

    app.directive('modal', function ($document) {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                modalOpen: "=open",
                options: "=",
                onClose: "&"
            },
            templateUrl: '/app/templates/modal.html',
            controller: function ($scope) {
                $scope.close = function () {
                    $scope.modalOpen = false;
                    $scope.onClose();
                };
            },
            link: function (scope, elements, attributes) {
                var options = angular.extend({
                    height: '250',
                    width: '500',
                    top: '20%',
                    left: '30%'
                }, scope.options);

                elements.find('.modal-container').css({
                    'left': options.left,
                    'top': options.top,
                    'height': options.height + 'px',
                    'width': options.width + 'px'
                });

                var pageHeight = $document.height();
                var pageWidth = $document.width();
                elements.find('.modal-blackout').css({
                    'width': pageWidth + 'px',
                    'height': pageHeight + 'px'
                });
            }
        };
    });
}());