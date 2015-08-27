algorithm_app.controller('adminController', function($scope,$routeParams, $location, $timeout, usersFactory, algorithmFactory) {
  var that = this;
  that.algorithm_index_bool = false;
  that.algorithm_new_bool = false;
  that.users_index_bool = false;
  that.users_new_bool = false;
  that.data_index_bool = false;
  that.data_new_bool = false;

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
      that.algorithm['hint1_time'] = new Date(that.algorithm['hint1_time']*1);
      that.algorithm['hint2_time'] = new Date(that.algorithm['hint2_time']*1);
      that.algorithm['hint3_time'] = new Date(that.algorithm['hint3_time']*1);
      that.algorithm['prev_solution_unlock_time'] = new Date(that.algorithm['prev_solution_unlock_time']*1);
      that.algorithm['resubmit_after'] = new Date((that.algorithm['resubmit_after'])*60000);
      that.algorithm['degradation_rate'] = new Date(that.algorithm['degradation_rate']*3600000);
      that.algorithm['time_allowed'] =new Date(that.algorithm['time_allowed']*60000);

    }
      algorithmFactory.create(that.algorithm, function(data){console.log("and I am back");});
    console.log("I will save you!", that.algorithm);
  }
});
