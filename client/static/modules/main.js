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
