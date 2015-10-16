algorithm_app.factory('algorithmFactory', function($http) {
  factory = {};
  algorithms = [];
  single_algorithm = {};

  factory.set_single = function (data){
    single_algorithm = data;
  }
  factory.show_single = function(callback){
    callback(single_algorithm);
  }

  factory.delete_algorithm = function(data,callback){
    $http.delete('/algorithm/'+data).then(function(){
      callback();
    }).catch(function(response){
      console.log(response);
    });
  }

  factory.index = function(callback){
      console.log("algorithm");
   $http.get('/algorithms').then(function(output) {
      algorithms = output;
      callback(algorithms);
    })
    .catch(function(response) {
      console.error('error', response.status, response.data);
    })
    .finally(function() {
      console.log("finally finished");
    });
  }

  factory.create = function(data, callback){
    console.log("create algorithm");
    $http.post('/algorithms', data).then(function(output){
      callback();
      console.log(output.data);
    }).catch(function(response) {
      console.error('error', response.status, response.data);
    })
    .finally(function() {
      console.log("finally finished");
    });
  }

  factory.update = function(data,callback){
    console.log(data, "FROM FACTORY UPDATE");
    $http.post('/algorithms/'+data._id, data).then(function(output){})
    .catch(function(response){
      console.log("error!");
    })
    .finally(function(){console.log("done");});
  }

  return factory;
});
