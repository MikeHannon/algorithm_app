algorithm_app.factory('usersFactory', function($http) {
  var factory = {};
  factory.users = [];

  var users_algorithms = [];
  var user = {};
  factory.update_current_algorithms = function (data){
    users_algorithms = data;

  }
  factory.setUser = function(user_data){
    user = user_data;
    this.testObject = user_data;
    console.log(this);
    //console.log(user);
    this.users_algorithms(user._id,function(data){
      users_algorithms = data;
      console.log(data);
    });
  //  this.index;
  //  console.log(user, "I AM USER");
  }
  factory.get_current_algorithms = function(callback){
    callback(users_algorithms);
  }
//  console.log(factory, "I am a factory");
  factory.index = function(callback){
   $http.get('/users').success(function(output) {
      users = output;
      callback(users);
    });
  }
  factory.index2 = function(){
    $http.get('/users').success(function(output) {
      console.log("hello");
       this.users = output;
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
    var that = this;
//adapt this to correlate with the updated model.
    var algorithm_info = {};
    algorithm_info['keystrokes']=0;
    algorithm_info['unlocked']=true;
    algorithm_info['score']=0;
  //  algorithm_info['time_spent_reset'] = algo.time_allowed;
    algorithm_info['time_spent']=algo.time_allowed;
    algorithm_info['algo_id']=algo._id;
    algorithm_info['prev_solution'] ="";
    algorithm_info['current_solution'] ="";
    algorithm_info['working_solution'] = "";
    algorithm_info['difficulty']=algo.difficulty;
    algorithm_info['algorithm_type']=algo.type;
  //  algorithm_info['time_to_resubmit'] = algo.resubmit_after;
    algorithm_info['time_to_resubmit'] = 0;
    algorithm_info['threestartime'] = 0;
    algorithm_info['solution_efficiency'] = 0;
    console.log(algorithm_info, "algo_info!");
    $http.post('/users/'+user_id+'/'+algo._id, algorithm_info).then(function(output){
      callback();
    });
  }// I AM HERE!

  factory.scoreAlgorithm = function(hints, algorithm, callback){

    console.log(hints, algorithm, "--------------");
      //console.log(callback);
    for (var i = 0; i < users_algorithms.length; i ++){
      console.log(users_algorithms[i].algo_id);
      if (users_algorithms[i].algo_id == algorithm._id){
    //    console.log(user, "I AM A USER");
        if (hints.hints == 0){users_algorithms[i].score = 3;}
        else if (hints.hints == 1){users_algorithms[i].score = 2;}
        else if (hints.hints == 2){users_algorithms[i].score = 1;}
        else {users_algorithms[i].score = 0;}
        console.log(users_algorithms[i], "--------");

        users_algorithms[i].time_spent = hints.time_spent;
      //  console.log(users_algorithms[i].time_spent);
        users_algorithms[i].time_to_resubmit = hints.time_to_resubmit
      //  console.log(users_algorithms[i].time_to_resubmit);

        console.log(users_algorithms[i], "2--------");
        $http.patch('/users2/'+user._id+'/'+users_algorithms[i]._id, users_algorithms[i]).then(function(output){
        //  console.log(users_algorithms);

          users_algorithms = output.data.algorithm;
          console.log("#####################");
          console.log(users_algorithms);
          console.log("#####################");
          callback();
          console.log(output), function(){console.log("ERROR");};
        });
        break;
        //console.log(users_algorithms[i]);
      }
    }
  //  console.log(users_algorithms);
  };

  factory.update_algorithm = function(user_id, algorithm_id, callback){
    console.log(user_id);
    var algorithm_info = {};
    algorithm_info['keystrokes']=0;
    algorithm_info['unlocked']=true;
    algorithm_info['score']=0;
    algorithm_info['time_spent']=algorithm_id.time_allowed;
    algorithm_info['algo_id']=algorithm_id._id;
    algorithm_info['difficulty']=algorithm_id.difficulty;
    algorithm_info['algorithm_type']=algorithm_id.type;
  //  algorithm_info['prev_solution'] ="";
    algorithm_info['current_solution'] ="";
    algorithm_info['working_solution'] = "";
    algorithm_info['time_to_resubmit'] = algorithm_id.resubmit_after;
    algorithm_info['threestartime'] = 0;
    algorithm_info['solution_efficiency'] = 0;
    console.log(algorithm_info, "algo_info!");
    $http.patch('/users/'+user_id+'/'+algorithm_id._id, algorithm_info).then(function(output){
      console.log(output);
      callback();},
      function(){console.log("ERROR");});
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
  factory.reset_timers = function(user, algorithm, callback){
    console.log(user._id);
    var algorithm_info = {};

    algorithm_info['time_spent']=algorithm.time_allowed;
    algorithm_info['time_to_resubmit'] = algorithm.resubmit_after;
    algorithm_info['algo_id'] = algorithm._id;

    console.log(algorithm_info, "algo_info!");
    $http.patch('/users/'+user._id+'/'+ algorithm._id, algorithm_info).then(function(output){
      users_algorithms = output.data.algorithm;
      console.log(output.data.algorithm, "GRRRRRRR");
      callback();},
      function(){console.log("ERROR");});
      //console.log(user._id);
  //  callback();
  }
  // get all info
  factory.users_algorithms = function(user_id, callback){
    console.log(user_id);
    if (user_id){
    $http.post("/users_algorithms/"+user_id).then(function(data){
        console.log(data.data.users_algorithms.algorithm);
        users_algorithms = data.data.users_algorithms.algorithm;
        callback(users_algorithms);

    }, function(){});
    }
  }
  factory.unloadPage = function(algo, user_id){
    console.log(algo);
    for (var i = 0; i < algo.length; i ++){
      if(algo[i].algo_id == users_algorithms[i].algo_id);
      algo[i].score = users_algorithms[i].score;
    }
    console.log(algo);
    $http.patch("/users_algos/"+user_id, algo).then(function(data){}), function(){};
  };

  factory.update = function(data, callback){
    console.log("hello");
    $http.patch('/users/'+data._id, data).then(function(data){
      console.log(data.data, "FROM UPDATE");
      callback();
    });    //usersFactory.update(that.updatable_user)
  };
  factory.delete_user = function(data,callback){
    $http.delete('/users/'+data).then(function(data){
      console.log(data.data);
      callback();
    });
  }

return factory;
});
