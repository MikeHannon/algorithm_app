

algorithm_app.controller('validCredentials', function($scope,$routeParams, $location, $timeout, $cookies, usersFactory) {
  var that = this;
  this.user = {};
  this.login_errors;
  this.registration_errors;


  this.check_login = function(){
    var myDate = Date.now();
    console.log("BANNANA");
    var last_login = $cookies.get("updated_at");
    console.log(last_login);
    console.log($cookies.get("first_name"));
  //  console.log()
    console.log((myDate - last_login) < 86400000);

    if ($cookies.get("first_name") && (myDate - last_login) < 86400000 ){
      console.log("here");
      that.user['first_name'] = $cookies.get("first_name");
      that.user['email'] = $cookies.get("email");
      that.user['admin_level'] = $cookies.get("admin_level");
      that.user['_id'] = $cookies.get("user_id");
      //
      that.login_errors = null;
      usersFactory.setUser(that.user);
      //$location.path("/algorithms");
    }
    else {
      $cookies.remove("first_name");
      $cookies.remove("email");
      $cookies.remove("admin_level");
      $cookies.remove("csrftoken");
      $cookies.remove("user_id");
      $cookies.remove("updated_at");
      $location.path("/");
      that.user = {};
      }
    }
    this.check_login();
  });
