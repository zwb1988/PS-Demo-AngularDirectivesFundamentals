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
        return {
            scope: true,
            link: {
                pre: function (scope, elements, attributes) {
                    elements.data('name', 'The Emperor');
                    scope.master = 'The Emperor';
                }
            }
        };
    });

    app.directive('vader', function () {
        return {
            scope: true,
            link: {
                pre: function (scope
                        , elements, attributes) {
                    elements.data('name', 'Vader');
                    elements.data('master', scope.master);
                    console.log('Vader\'s master is: ' + scope.master);
                    scope.master = 'Vader';
                }
            }
        };
    });

    app.directive('starkiller', function () {
        return {
            scope: true,
            link: {
                post: function (scope
                        , elements, attributes) {
                    elements.data('name', 'Starkiller');
                    elements.data('master', scope.master);
                    console.log('Starkiller\'s master is: ' + scope.master);
                }
            }
        };
    });
}());