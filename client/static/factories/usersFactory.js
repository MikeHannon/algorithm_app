algorithm_app.factory('usersFactory', function($http) {
  var factory = {};
  var users = [];
  var users_algorithms = [];
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

  factory.initiate_algorithm = function(user_id,algo,callback){
    console.log(algo);

    var algorithm_info = {};
    algorithm_info['keystrokes']=0;
    algorithm_info['unlocked']=true;
    algorithm_info['score']=0;
    algorithm_info['time_spent']=algo.time_allowed;
    algorithm_info['algo_id']=algo._id;
    algorithm_info['prev_solution'] ="";
    algorithm_info['current_solution'] ="";
    algorithm_info['working_solution'] = "";
    algorithm_info['restart_time'] = algo.resubmit_after;
    algorithm_info['threestartime'] = new Date(9999999999999);
    algorithm_info['solution_efficiency'] = 0;

    $http.post('/users/'+user_id+'/'+algo._id, algorithm_info).success(function(output){
      console.log(output);
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
  // get all info
  factory.users_algorithms = function(user_id, callback){
    $http.post("/users_algorithms/"+user_id).then(function(data){
        console.log(data.data.users_algorithms.algorithm);
        users_algorithms = data.data.users_algorithms.algorithm;
        callback(users_algorithms);

    }, function(){});


  }



return factory;
});
