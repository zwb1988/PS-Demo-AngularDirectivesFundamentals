(function () {
    var app = angular.module('app');

    app.controller('mainCtrlCustomNgRepeat', function ($scope) {
        $scope.bountyHunters = [
            {name: 'Boba Fett'},
            {name: 'IG-88'},
            {name: 'Dengar'},
            {name: 'Cad Bane'}
        ];

        $scope.add = function () {
            $scope.bountyHunters.push({name: '4LOM'});
        };

        $scope.remove = function () {
            $scope.bountyHunters.length--;
        };
    });

    app.directive('myRepeat', function () {
        return {
            restrict: 'A',
            transclude: 'element',
            link: function (scope, elements, attributes, controller, transclude) {
                var pieces = attributes.myRepeat.split(' ');
                var itemString = pieces[0];
                var collectionName = pieces[2];
                var itemCollection = [];

                scope.$watchCollection(collectionName, function (collection) {
                    if (itemCollection.length > 0) {
                        for (var i = 0; i < itemCollection.length; i++) {
                            // clone object is jQuery selection, call remove
                            // method to remove itself from the DOM
                            itemCollection[i].clonedDom.remove();
                            // remove the child scope per elements to allow
                            // GC
                            itemCollection[i].scope.$destroy();
                        }
                    }
                    for (var i = 0; i < collection.length; i++) {
                        var childScope = scope.$new();
                        childScope[itemString] = collection[i];
                        transclude(childScope, function (clone) {
                            elements.before(clone);
                            itemCollection.push({
                                scope: childScope,
                                clonedDom: clone});
                        });
                    }
                });
            }
        };
    });
}());