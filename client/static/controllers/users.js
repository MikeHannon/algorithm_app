algorithm_app.controller('usersController', function($scope,$routeParams, $location,$interval, $timeout, $cookies, usersFactory) {
  var that = this;
  this.user = {};
  this.login_errors;
  this.registration_errors;
  this.counter = 100;
  var stop;

//this.begin_countdowh();


  console.log($cookies);
  console.log($cookies.getAll(),"my cookies");
  console.log($cookies.get("first_name"));
  this.users = [];
  this.users_algorithms = [];
  this.active_algorithm = {};
  this.IndexTimers = [];
  this.ShowTimers = [];


  this.number_of_times = function(n){
    return new Array(n);
  }


//   console.log(last_login);
// //  console.log(new Date(last_login).getMilliseconds());
//   console.log((myDate - last_login));




  this.login = function(user_info){
    usersFactory.login(user_info, function(data){
    //  console.log(data);
      if (data.errors){that.login_errors = data;
      console.log(that.login_errors);}
      else {
        set_users(data);
        that.login_errors = null;
        that.users_algorithms_index();
        $location.path("/algorithms");
      }
    });
  };

  this.index = function(){
    usersFactory.index(function(data){
      that.users = data;
    });
  }

  this.logout = function(){
    $cookies.remove("user_id");
    $cookies.remove("first_name");
    $cookies.remove("email");
    $cookies.remove("admin_level");
    $cookies.remove("csrftoken");
    that.user = {};
  }

  this.registers = function(user_info){
    user_info['token']=213421512341234;
  //  console.log(user_info);
    usersFactory.register(user_info, function(data){
    //  console.log(data);
      if (data.errors){
        that.registration_errors = data.errors;
      }
      else {
      //  console.log(data);
      //  data['user_id']=data._id;
        set_users(data);
        that.login_errors = null;
        that.users_algorithms_index();
        $location.path("/algorithms");

      }
    });


  }

  this.initiate_algorithm = function(user_id, algo){
    console.log(algo,"from initiate");
    usersFactory.initiate_algorithm(user_id,algo,function(data){

     //console.log(data);
    });
  }

  this.users_algorithms_index = function(){
    usersFactory.users_algorithms(that.user._id,function(data){
      console.log(that.user);
      that.users_algorithms=data;
      console.log(that.users_algorithms,"user_algorithms!");
      that.begin_timers();
    });
  }

this.set_active_algorithm = function(algo_id){
  if (that.users_algorithms){
    for (var i = 0; i < that.users_algorithms.length; i ++){
      if (that.users_algorithms[i].algo_id == algo_id){
        that.active_algorithm = that.users_algorithms[i];
        that.algorithm_timer();
      }
    }
  }
}

this.algorithm_unlocked = function(algorithm_id){
//console.log(algorithm_id);
//console.log(that.users_algorithms);

  if (that.users_algorithms){
    for (var i = 0; i < that.users_algorithms.length; i ++){
        //console.log(that.users_algorithms[i]._id);
      if (that.users_algorithms[i].algo_id == algorithm_id){
        return i;
      }
    }
  }
  return -1;
}

this.algo_up_to_date = function(algorithm_updated, algo_id){
  //console.log(algorithm_updated);

  if (that.users_algorithms){
    for (var i = 0; i < that.users_algorithms.length; i ++){
      if (that.users_algorithms[i].algo_id == algo_id){
        if (that.users_algorithms[i].created_at < algorithm_updated){
          return false;
        }
      }
    }
  }
  return true;
}
this.algorithm_reunlock = function(algorithm_info){
  console.log(algorithm_info);
  usersFactory.update_algorithm(that.user.user_id, algorithm_info);
}

this.is_algorithm = function(algorithm_id){
  if (that.users_algorithms){
    for (var i = 0; i < that.users_algorithms.length; i ++){
      //  console.log(that.users_algorithms[i]);
      if (that.users_algorithms[i].algo_id == algorithm_id){

          // console.log("old!");
        return that.users_algorithms[i];
      }
    }
  }
  return null;
}



function set_users(data){
  $cookies.put('first_name', data.first_name);
  $cookies.put('email', data.email);
  $cookies.put('admin_level', data.admin_level);
  $cookies.put('updated_at', data.updated_at);
  $cookies.put('user_id', data._id);
  that.user = data;
  usersFactory.setUser(data);
  that.users_algorithms_index();
}
this.algorithm_timer = function(){
  if (that.IndexTimers.length == 0){
    //move timers to a factory!
    var t =  setInterval(function(){
          if (that.active_algorithm.time_spent > 0){
            that.active_algorithm.time_spent -= 1000;
            $scope.$apply();
          }
          else {(clearInterval(this));}

        },1000);
    that.IndexTimers.push(t);
  }
}

this.begin_timers =function(){
  //var myArray = [];
  if (that.ShowTimers.length == 0){
    that.ShowTimers.push(
    setInterval(function(){
  for (var i = 0; i < that.users_algorithms.length; i ++){

      if (that.users_algorithms[i].time_to_resubmit > 0){

        //console.log((that.users_algorithms[i].time_to_resubmit));
        that.users_algorithms[i].time_to_resubmit -= 1000;

        // console.log(that.users_algorithms[i].restart_time);
        // console.log(that.counter);
        that.counter -=1;
        $scope.$apply();
      }
      else {(clearInterval(this));}
    }
  },1000))}
  }


var k = setInterval(function(){
  if (that.counter > 0){
    //console.log(that.counter);
    that.counter -=1;
    $scope.$apply();
  }
  else (clearInterval(this));
},1000);

// $scope.$watch('that.users_algorithms',function(){
//
//   console.log(that.users_algorithms);
//      return that.counter;
//  },function(value){
//       console.log(value)
//  });
// });

this.check_login = function(){
  var myDate = Date.now();
  var last_login = $cookies.get("updated_at");
  if ($cookies.get("first_name") && (myDate - last_login) < 86400000 ){
    that.user['first_name'] = $cookies.get("first_name");
    that.user['email'] = $cookies.get("email");
    that.user['admin_level'] = $cookies.get("admin_level");
    that.user['_id'] = $cookies.get("user_id");
    $location.path("/algorithms");
    that.login_errors = null;
    that.users_algorithms_index();
  }
  else {
    $cookies.remove("first_name");
    $cookies.remove("email");
    $cookies.remove("admin_level");
    $cookies.remove("csrftoken");
    $cookies.remove("user_id");
    $location.path("/");
    that.user = {};
  }
}
this.check_login();

$scope.$watch('that.counter', function () {
  console.log(that.counter);
     return that.counter;
 },function(value){
      console.log(value)
 });

 window.onbeforeunload = function(event) {
    console.log(that.users_algorithms[0].time_to_resubmit);
    console.log(that.users_algorithms[0].time_spent);
    event.returnValue = that.user.first_name;
};
  // this.deleteUser = usersFactory.createUser(data, function(data){that.users = data});
  //
  // this.showUser = usersFactory.deleteUser(data, function(data){that.users = data});
  //
  // this.editUser = usersFactory.updateUser(data, function(data){that.users = data});
  //
  // this.updateUser = usersFactory.updateUser(data, function(data){that.users = data});

});
