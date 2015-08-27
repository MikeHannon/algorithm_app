algorithm_app.factory('usersFactory', function($http) {
  var factory = {};
  var users = [];
  console.log(factory, "I am a factory");
  factory.index = function(callback){
   $http.get('/users').success(function(output) {
      users = output;
      callback(users);
    });
  }

  factory.createUsers = function(callback){
   $http.patch('/users/1').success(function(output) {
      users = output;
      callback(users);
    });
  }


  factory.login = function(info, callback){
    console.log(info);
    $http.post('/users/login', info).
      then(function(response) {
    console.log(response['data']);
    callback(response['data']);
    // this callback will be called asynchronously
    // when the response is available
  }, function(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
  }


  factory.register = function(user_data, callback){
    if (user_data){
      if (user_data['first_name'] && user_data['last_name'] && user_data['email'] && user_data['password'] && user_data['password_rpt'] && (user_data['password'] == user_data['password_rpt'])){
        $http.post('/users', user_data).then(function(response){
          callback(response['data']);
          // console.log(response['data']);
        },function(response){});
      }
      else {
        console.log("incomplete data");
      }
    }
    else {console.log("no data");}

  }



return factory;
});
