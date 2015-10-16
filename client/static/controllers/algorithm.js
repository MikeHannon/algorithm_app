algorithm_app.controller('algorithmController', function($scope,$routeParams, $location, $timeout, algorithmFactory) {

  var that = this;
//  that.show_algorithm = {};
  this.show_algorithm = {};
  this.algorithms = [{name:"selection sort"},{name:"selection sort"},{name:"selection sort"},{name:"selection sort"},{name:"selection sort"},{name:"selection sort"},{name:"selection sort"}];
  this.index = function(){
    console.log("to factory");
    algorithmFactory.index(function(data){
      console.log(data.data);
      that.algorithms = data.data;
    });
  }

  this.show_algorithm_html = function(data, user_index){
    // console.log(data, "dstuff");
    console.log(user_index);
    if (user_index){
      console.log(user_index);
    }
    that.show_algorithm = data;
    console.log(that.show_algorithm);
  }

  this.delete_algorithm = function(algo_id){
    algorithmFactory.delete_algorithm(algo_id, function(){that.index();});
    //console.log("hello");
  }

  this.edit_algorithm = function(algo){
    console.log(algo);
      that.show_algorithm = algo;
  }
  this.index();
  this.update_algorithm= function(){
    if (starting_code.editor.getValue()!= "" && test_code.editor.getValue() != "" && solution.editor.getValue() != ""){
      that.show_algorithm.starting_code =starting_code.editor.getValue();
      that.show_algorithm.solution =solution.editor.getValue();
      that.show_algorithm.test_code =test_code.editor.getValue();
    // console.log(starting_code.editor.getValue(), "FROM START");
  }
  algorithmFactory.update(that.show_algorithm,function(data){
    console.log(data.data);
  //  that.algorithms = data.data;
  });

    // if (that.show_algorithm){
    //   that.algorithm['starting_code'] =starting_code.editor.getValue();
    //   that.algorithm['test_code'] =test_code.editor.getValue();
    //   that.algorithm['solution'] =solution.editor.getValue();
    // }
  //  console.log(that.show_algorithm);
  }
});
