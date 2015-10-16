var algorithm_app = angular.module('algorithm_app',[
  'ngRoute','ngSanitize','ngCookies'
]);
//routes
algorithm_app.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
       templateUrl: './../partials/users/new.html',
        controller: 'validCredentials'
      //  controller: 'indexController as cntrl'
    })
    .when('/algorithms',{
       templateUrl: './../partials/algorithms/index.html',
       controller: 'validCredentials'
    })
    .when('/algorithms/:id/edit',{
       templateUrl: './../partials/algorithms/edit.html',
       controller: 'validCredentials'
    })

    .when('/challenges/:algorithmId',{
       templateUrl: './../partials/algorithms/show.html',
       controller: 'validCredentials'
      //  controller: 'usersController as user'
    })
    .when('/users',{
       templateUrl: './../partials/users/new.html',
       controller: 'validCredentials'
      //  controller: 'usersController as user'
    })
    .when('/admin',{
       templateUrl: './../partials/admin/index.html',
       controller: 'validCredentials'
    })
    .otherwise({
      redirectTo: '/'
    });
});
algorithm_app.filter('duration', function() {
    //Returns duration from milliseconds in hh:mm:ss format.
      return function(millseconds) {
        var seconds = Math.floor(millseconds / 1000);
        var h = 3600;
        var m = 60;
        var hours = Math.floor(seconds/h);
        var minutes = Math.floor( (seconds % h)/m );
        var scnds = Math.floor( (seconds % m) );
        var timeString = '';
        if(scnds < 10) scnds = "0"+scnds;
        if(hours < 10) hours = "0"+hours;
        if(minutes < 10) minutes = "0"+minutes;
        timeString = hours +":"+ minutes +":"+scnds;
        return timeString;
    }
});
algorithm_app.directive('ngConfirmClick', [
  function(){
    return {
      priority: -1,
      restrict: 'A',
      link: function(scope, element, attrs){
        element.bind('click', function(e){
          var message = attrs.ngConfirmClick;
          if(message && !confirm(message)){
            e.stopImmediatePropagation();
            e.preventDefault();
          }
        });
      }
    }
  }
]);
