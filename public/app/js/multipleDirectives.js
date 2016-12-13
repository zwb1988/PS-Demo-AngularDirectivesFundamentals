(function () {
    var app = angular.module('app');
    
    app.controller('mainCtrlMultipleDirectives', function($scope){
        
    });
    
    app.directive('inherited1', function(){
        return {
            scope:false,
            link: function(scope) {
                console.log('inherited1', scope);
            }
        };
    });
    
    app.directive('inherited2', function(){
        return {
            scope:false,
            link: function(scope) {
                console.log('inherited2', scope);
            }
        };
    });
}());