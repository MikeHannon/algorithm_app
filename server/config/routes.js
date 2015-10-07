var Users = require('./../controllers/users_c.js');
var Algorithms = require('./../controllers/algorithms_c.js');
var bodyParser = require('body-parser');

module.exports = function(app) {


 app.use(bodyParser.json());
//index
  app.get('/users', function(req,res){
    Users.index(req,res);
  });
//create
  app.post('/users', function(req,res){
    Users.create(req,res);
  });
//new
  app.post('/users/:user_id/:algo_id',function(req,res){
  //  console.log(req.body, "unlocking this!");
    Users.create_algorithm(req,res);
    //res.json({"hello":"worldinput"});
  });
  app.patch('/users/:user_id/:algo_id',function(req,res){
    //console.log("hello");
    Users.update_algorithm(req,res);
    //res.json({"hello":"worldinput"});
  });
  app.patch('/users2/:user_id/:algo_id',function(req,res){
    console.log(req.body);
    Users.update_algorithm2(req,res);
  //  Users.update_algorithm(req,res);
    //res.json({"hello":"worldinput"});
  });

  app.post('/users_algorithms/:user_id', function(req,res){
    Users.get_algorithms(req,res);
  //  console.log(req.params.user_id, "I AM PARAMS");
  });



  app.get('/users/new', function(req,res){
    res.json({"hello":"world"});
  });
//@login
  app.post('/users/login', function(req,res){
      Users.login(req,res);
  });
//test

  app.get('/algorithms', function(req, res){
    // console.log("in the router");
    Algorithms.index(req,res);
  });

  app.post('/algorithms', function(req, res){
    // console.log(req.body);
    Algorithms.create(req,res);
    // res.json({"hello":"world"});
  });

  app.post('/algorithms/:id',function(req,res){
  //  console.log(req.params);
    Algorithms.update(req,res);
  });

  // app.post
//show
  app.get('/users/:id', function(req,res){
    res.json({"hello": req.params.id});
  });
//update
  app.patch('/users/:id', function(req,res){
    res.json({"hello": req.params.id});
  });
//
  app.delete('/users/:id', function(req,res){
  res.json({"hello": req.params.id});
  });

  app.patch('/users_algos/:id', function(req,res){
    Users.update_algorithm3(req,res);
    // console.log("????");
    // console.log(req.params);
  });
}
