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
    Users.create_algorithm(req,res);
    //res.json({"hello":"worldinput"});
  });

  app.post('/users_algorithms/:user_id', function(req,res){
    Users.get_algorithms(req,res);
    console.log(req.params.user_id);
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
    console.log("in the router");
    Algorithms.index(req,res);
  });

  app.post('/algorithms', function(req, res){
    // console.log(req.body);
    Algorithms.create(req,res);
    // res.json({"hello":"world"});
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

}
