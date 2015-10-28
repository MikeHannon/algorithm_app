algorithm_app.controller('adminController', function($scope,$routeParams, $location, $timeout, usersFactory, algorithmFactory) {
  var that = this;
  that.algorithm_index_bool = false;
  that.algorithm_new_bool = false;
  that.users_index_bool = false;
  that.users_new_bool = false;
  that.data_index_bool = false;
  that.data_new_bool = false;
  that.oneStar = "Use two hints";
  that.twoStars = "Use one hint";
  that.threeStars = "Use no hints";
  that.weight = 0;
  that.hint1_timer = 10000000;
  that.hint2_timer = 18000000;
  that.hint3_timer = 24000000;

  that.hint1_keystroke = 300;
  that.hint2_keystroke = 500;
  that.hint3_keystroke = 700;

  that.prev_solution_unlock_keystrokes = 1000;
  that.prev_solution_unlock_timer = 24000000;
  that.resubmit_after = 60000; // 1 minute
  that.degradation_rate = 36000000000; // 1000 hrs
  that.time_allowed = 36000000; //1 hr
  that.type_of = "Choose one: Array, Linked_List, Data Structure, Library, String, Other";
  that.sortType     = 'first_name'; // set the default sort type
  that.sortReverse  = false; //default order

  that.getUsers = function(){
    usersFactory.index();
  }

  that.algorithm_index = function(){
    that.algorithm_index_bool = true;
    that.algorithm_new_bool = false;
    that.users_index_bool = false;
    that.users_new_bool = false;
    that.data_index_bool = false;
    that.data_new_bool = false;
  };

  that.algorithm_new = function(){
    that.algorithm_index_bool = false;
    that.algorithm_new_bool = true;
    that.users_index_bool = false;
    that.users_new_bool = false;
    that.data_index_bool = false;
    that.data_new_bool = false;
  };

  that.users_index = function(){
    console.log("users index");
    that.algorithm_index_bool = false;
    that.algorithm_new_bool = false;
    that.users_index_bool = true;
    that.users_new_bool = false;
    that.data_index_bool = false;
    that.data_new_bool = false;
  };
  that.users_new = function(){
    that.algorithm_index_bool = false;
    that.algorithm_new_bool = false;
    that.users_index_bool = false;
    that.users_new_bool = true;
    that.data_index_bool = false;
    that.data_new_bool = false;
  };
  that.data_index = function(){
    that.algorithm_index_bool = false;
    that.algorithm_new_bool = false;
    that.users_index_bool = false;
    that.users_new_bool = false;
    that.data_index_bool = true;
    that.data_new_bool = false;
  };
  that.data_new = function(){
    that.algorithm_index_bool = false;
    that.algorithm_new_bool = false;
    that.users_index_bool = false;
    that.users_new_bool = false;
    that.data_index_bool = false;
    that.data_new_bool = true;
  };
  that.create_algorithm = function(){

    if (!that.algorithm){
      that.algorithm = {};
    }
    if (that.algorithm){
      that.algorithm['starting_code'] =starting_code.editor.getValue();
      that.algorithm['test_code'] =test_code.editor.getValue();
      that.algorithm['solution'] =solution.editor.getValue();
    }
    if (that.algorithm['hint1_time']&&  that.algorithm['hint2_time'] && that.algorithm['hint3_time'] && that.algorithm['prev_solution_unlock_time'] && that.algorithm['resubmit_after'] &&   that.algorithm['degradation_rate'] && that.algorithm['time_allowed'] ){
      //add if statements here as to whether these have been set to reasonable parameters otherwise they keep multiplying everytime you fail a submit!
      that.algorithm['hint1_time'] = that.algorithm['hint1_time']*1;
      that.algorithm['hint2_time'] = that.algorithm['hint2_time']*1;
      that.algorithm['hint3_time'] = that.algorithm['hint3_time']*1;
      that.algorithm['prev_solution_unlock_time'] = that.algorithm['prev_solution_unlock_time']*1;
      that.algorithm['resubmit_after'] = that.algorithm['resubmit_after']*1;
      that.algorithm['degradation_rate'] = that.algorithm['degradation_rate']*1;
      that.algorithm['time_allowed'] =that.algorithm['time_allowed']*1;

    }
      algorithmFactory.create(that.algorithm, function(data){console.log("and I am back");});
    console.log("I will save you!", that.algorithm);
  }
});
