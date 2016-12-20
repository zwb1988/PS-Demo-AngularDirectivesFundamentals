(function () {

    /*
     * Link function execution order:
     * (Parent) pre-link -> (Child) pre-link -> (Grandchild) pre-link ->
     * (Grandchild) post-link -> (Child) post-link -> (Parent) post-link
     * 
     * Controller runs before link functions
     */

    var app = angular.module('app', []);

    app.controller('mainCtrlPrePostLink', function () {

    });

    app.directive('emperor', function () {
        var name = "The Emperor";

        return {
            scope: true,
            controller: function ($scope) {
                this.name = name;
            },
            link: function (scope, elements, attributes) {
                elements.data('name', name);
            }
        };
    });

    app.directive('vader', function () {
        var name = 'Vender';
        return {
            scope: true,
            require: '^emperor',
            controller: function ($scope) {
                this.name = name;
            },
            // note: emperorController - is the actual controller and not a scope,
            // name in the emperorController need to bind to this, but not
            // scope.name
            link: function (scope, elements, attributes, emperorController) {
                elements.data('name', name);
                elements.data('master', emperorController.name);
                console.log('Vader\'s master is: ' + emperorController.name);
            }
        };
    });

    app.directive('starkiller', function () {
        return {
            scope: true,
            //require: '^vader', // look for parent or current node as vador
            //require: 'vader', // look for vador as current node
            //require: '?vader', // check of current node is vador
            require: '?^vader', // only parent node, not current node as vador

            /*
             * (no prefix) - Locate the required controller on the current element. Throw an error if not found.
             * ? - Attempt to locate the required controller or pass null to the link fn if not found.
             * ^ - Locate the required controller by searching the element and its parents. Throw an error if not found.
             * ^^ - Locate the required controller by searching the element's parents. Throw an error if not found.
             * ?^ - Attempt to locate the required controller by searching the element and its parents or pass null to the link fn if not found.
             * ?^^ - Attempt to locate the required controller by searching the element's parents, or pass null to the link fn if not found. 
             */

            controller: function ($scope) {

            },
            link: function (scope, elements, attributes, vadorController) {
                elements.data('name', 'Starkiller');
                if (vadorController) {
                    elements.data('master', vadorController.name);
                    console.log('Starkiller\'s master is: ' + vadorController.name);
                } else {
                    console.log('Starkiller doesn\'t have a master');
                }
            }
        };
    });
}());