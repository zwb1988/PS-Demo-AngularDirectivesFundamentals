(function () {
    var app = angular.module('app', []);

    app.controller('mainCtrlPanelDirective', function ($scope) {
        //$scope.identity = "Identity: Main Controller";
    });

    app.directive("swTabstrip", function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: true,
            controller: function ($scope) {
                //this.identity = $scope.identity;
                $scope.panes = [];
                $scope.select = function (pane) {
                    pane.selected = true;
                    $scope.panes.forEach(function (currPane) {
                        if (currPane !== pane) {
                            currPane.selected = false;
                        }
                    });
                };

                this.addPane = function (pane) {
                    $scope.panes.push(pane);
                    if ($scope.panes.length === 1) {
                        pane.selected = true;
                    }
                };
            },
            templateUrl: 'app/templates/swTabscript.html'
        };
    });

    app.directive("swPane", function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                title: "@"
            },
            require: '^swTabstrip',
            link: function (scope, elements, attributes, tabStripCtrl) {
                //console.log("wbTabstrip controller identity: " + tabStripCtrl.identity);
                tabStripCtrl.addPane(scope);
            },
            templateUrl: "app/templates/swPane.html"
        };
    });
}());