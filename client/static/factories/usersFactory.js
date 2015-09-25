algorithm_app.factory('usersFactory', function($http) {
  var factory = {};
  var users = [];
  var users_algorithms = [];
  var user = {};
  factory.setUser = function(user_data){
    user = user_data;
    this.users_algorithms(user.user_id,function(data){console.log(data);});
  //  this.index;
    console.log(user, "I AM USER");
  }
//  console.log(factory, "I am a factory");
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
    console.log("in factory");
//adapt this to correlate with the updated model.
    var algorithm_info = {};
    algorithm_info['keystrokes']=0;
    algorithm_info['unlocked']=true;
    algorithm_info['score']=0;
    algorithm_info['time_spent']=algo.time_allowed;
    algorithm_info['algo_id']=algo._id;
    algorithm_info['prev_solution'] ="";
    algorithm_info['current_solution'] ="";
    algorithm_info['working_solution'] = "";
    algorithm_info['time_to_resubmit'] = algo.resubmit_after;
    algorithm_info['threestartime'] = 0;
    algorithm_info['solution_efficiency'] = 0;
    console.log(algorithm_info, "algo_info!");
    $http.post('/users/'+user_id+'/'+algo._id, algorithm_info).then(function(output){
      console.log(output), function(){console.log("ERROR");};
    });
  }// I AM HERE!

  factory.scoreAlgorithm = function(hints, algorithm){
    console.log(hints, algorithm);
    for (var i = 0; i < users_algorithms.length; i ++){
      console.log(users_algorithms[i].algo_id);
      if (users_algorithms[i].algo_id == algorithm._id){
        console.log(user, "I AM A USER");
        if (hints == 0){users_algorithms[i].score = 3;}
        else if (hints == 1){users_algorithms[i].score = 2;}
        else if (hints == 2){users_algorithms[i].score = 1;}
        else {users_algorithms[i].score = 0;}

        $http.patch('/users2/'+user._id+'/'+users_algorithms[i]._id, users_algorithms[i]).then(function(output){
          console.log(output), function(){console.log("ERROR");};
        });
        break;
        //console.log(users_algorithms[i]);
      }
    }
  //  console.log(users_algorithms);
  };

  factory.update_algorithm = function(user_id, algorithm_id){
    console.log(user_id);
    var algorithm_info = {};
    algorithm_info['keystrokes']=0;
    algorithm_info['unlocked']=true;
    algorithm_info['score']=0;
    algorithm_info['time_spent']=algorithm_id.time_allowed;
    algorithm_info['algo_id']=algorithm_id._id;
  //  algorithm_info['prev_solution'] ="";
    algorithm_info['current_solution'] ="";
    algorithm_info['working_solution'] = "";
    algorithm_info['time_to_resubmit'] = algorithm_id.resubmit_after;
    algorithm_info['threestartime'] = 0;
    algorithm_info['solution_efficiency'] = 0;
    console.log(algorithm_info, "algo_info!");
    $http.patch('/users/'+user_id+'/'+algorithm_id._id, algorithm_info).then(function(output){
      console.log(output), function(){console.log("ERROR");};
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
    if (user_id){
    $http.post("/users_algorithms/"+user_id).then(function(data){
      //  console.log(data.data.users_algorithms.algorithm);
        users_algorithms = data.data.users_algorithms.algorithm;
        callback(users_algorithms);

    }, function(){});
    }

  }



return factory;
});
