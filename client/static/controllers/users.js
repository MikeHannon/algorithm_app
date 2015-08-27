algorithm_app.controller('usersController', function($scope, $location, $timeout, $cookies, usersFactory) {
  var that = this;
  this.user = {};
  this.login_errors;
  this.registration_errors;
  console.log($cookies);
  console.log($cookies.getAll(),"my cookies");
  console.log($cookies.get("first_name"));
  this.users = [];
//   console.log(last_login);
// //  console.log(new Date(last_login).getMilliseconds());
//   console.log((myDate - last_login));
  this.check_login = function(){
    var myDate = Date.now();
    var last_login = $cookies.get("updated_at");
    if ($cookies.get("first_name") && (myDate - last_login) < 86400000 ){
      that.user['first_name'] = $cookies.get("first_name");
      that.user['email'] = $cookies.get("email");
      that.user['admin_level'] = $cookies.get("admin_level");
      that.user['user_id'] = $cookies.get("user_id");
      $location.path("/algorithms");
      that.login_errors = null;
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

  this.login = function(user_info){
    usersFactory.login(user_info, function(data){
      console.log(data);
      if (data.errors){that.login_errors = data;
      console.log(that.login_errors);}
      else {
        set_users(data);
        that.login_errors = null;
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
    console.log(user_info);
    usersFactory.register(user_info, function(data){
      console.log(data);
      if (data.errors){
        that.registration_errors = data.errors;
      }
      else {
        console.log(data);
      //  data['user_id']=data._id;
        set_users(data);
        that.login_errors = null;
        $location.path("/algorithms");

      }
    });
  }
  function set_users(data){
    $cookies.put('first_name', data.first_name);
    $cookies.put('email', data.email);
    $cookies.put('admin_level', data.admin_level);
    $cookies.put('updated_at', data.updated_at);
    $cookies.put('user_id', data._id);
    that.user = data;
  }

  // this.deleteUser = usersFactory.createUser(data, function(data){that.users = data});
  //
  // this.showUser = usersFactory.deleteUser(data, function(data){that.users = data});
  //
  // this.editUser = usersFactory.updateUser(data, function(data){that.users = data});
  //
  // this.updateUser = usersFactory.updateUser(data, function(data){that.users = data});

});
