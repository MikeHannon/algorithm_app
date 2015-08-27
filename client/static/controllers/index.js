algorithm_app.controller('indexController', function($scope, $location, $timeout) {
  var that = this;
  this.algorithms = [{name:"selection sort"},{name:"selection sort"},{name:"selection sort"},{name:"selection sort"},{name:"selection sort"},{name:"selection sort"},{name:"selection sort"}];
  this.index = function(){
    console.log("to factory");
    algorithmFactory.index(function(data){
      console.log(data);
      that.algorithms = data;
    });
  }

});
