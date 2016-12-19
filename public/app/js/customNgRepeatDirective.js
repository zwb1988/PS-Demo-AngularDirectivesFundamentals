(function () {
    var app = angular.module('app');

    app.controller('mainCtrlCustomNgRepeat', function ($scope) {
        $scope.bountyHunters = [
            {name: 'Boba Fett', age: 35},
            {name: 'IG-88', age: 130},
            {name: 'Dengar', age: 42},
            {name: 'Bossk', age: 782},
            {name: 'Cad Bane', age: 51}
        ];

        $scope.add = function () {
            $scope.bountyHunters.push({name: '4LOM'});
        };

        $scope.remove = function () {
            $scope.bountyHunters.length--;
        };
    });

    app.directive('userList', function ($compile) {
        return {
            restrict: 'A',
            transclude: 'element',
            link: function (scope, elements, attributes, controller, transclude) {
                var pieces = attributes.userList.split(' ');
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
                            var template = $compile('<div class="panel panel-primary"><div class="panel-heading">{{' + itemString + '.name}}</div><div class="panel-body"></div></div>');
                            var wrapper = template(childScope);
                            wrapper.find('.panel-body').append(clone);
                            elements.before(wrapper);
                            itemCollection.push({
                                scope: childScope,
                                clonedDom: wrapper});
                        });
                    }
                });
            }
        };
    });
}());