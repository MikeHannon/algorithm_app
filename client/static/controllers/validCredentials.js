

algorithm_app.controller('validCredentials', function($scope,$routeParams, $location, $timeout, $cookies, usersFactory) {
  var that = this;
  this.user = {};
  this.login_errors;
  this.registration_errors;


  this.check_login = function(){
    var myDate = Date.now();
    var last_login = $cookies.get("updated_at");
    if ($cookies.get("first_name") && (myDate - last_login) < 86400000 ){
      that.user['first_name'] = $cookies.get("first_name");
      that.user['email'] = $cookies.get("email");
      that.user['admin_level'] = $cookies.get("admin_level");
      that.user['_id'] = $cookies.get("user_id");
      // $location.path("/algorithms");
      that.login_errors = null;
      usersFactory.setUser(that.user);
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
  });
