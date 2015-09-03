algorithm_app.controller('algorithmController', function($scope,$routeParams, $location, $timeout, algorithmFactory) {

  var that = this;
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
  this.index();
});
