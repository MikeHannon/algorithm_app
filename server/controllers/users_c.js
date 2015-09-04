var mongoose = require('mongoose');
var User = mongoose.model('User');


module.exports = (function() {
  return {
    index: function (req,res){
      User.find({}, function(err, users) {
        if (err){
          res.json({"error":err});
        }
        else {res.json(users);}
      });
    },

    login: function (req,res){
        User.findOne({"email": req.body['email']},function (err, user_info){
          if (err){res.json({"errors":err});}
          else if (!user_info){
            res.json({"errors":"user_name or password don't match"});
          }
          else if (user_info.password !== req.body.password){
            res.json({"errors":"user_name or password don't match"});
          }
          else {

            var myinfo = {"first_name":user_info.first_name, "admin_level":user_info.admin_level, "updated_at":Date.now(),
            "email":user_info.email, "_id":user_info._id}
            res.json(myinfo);
          }
      });
    },


    create: function(req, res){

      var regex =   new RegExp("^[a-z0-9](\.?[a-z0-9]){5,}@codingdojo.com$");
      var str = req.body.email;
      var str2 = str.replace(regex, "cdemployee");
      if (str2 == "cdemployee"){
        req.body["admin_level"] = 2;
      }
      else {req.body["admin_level"] = 0;
      }
      console.log(req.body);
      req.body['created_at'] = Date.now();
      req.body['updated_at'] = Date.now();
      user = new User(req.body);


      User.findOne({"email": req.body['email']}, 'first_name admin_level email',function (err, user_info){
        if (err) { console.log(err);}
        else {
          if (!user_info){
            // console.log(user_info, "I M THE FIRST USER");
            user.save(function(err, new_example) {
              if(err) {
                  console.log("a");
                var errs = [];
                for (var error in err.errors){
                  errs.push(err.errors[error]);
                }
                console.log("b");
                res.json({"errors": err});
              }
              else {
                console.log("c here");
                User.findOne({"email": req.body['email']}, 'first_name admin_level email updated_at _id',function (err, user_info){
                  console.log("d");
                  if (err) { console.log(err);}

                  // console.log(user_info, "found this here!");
                    res.json(user_info);
                  })
              }
            })
          }
          else {res.json({"errors":"User exists"});}
        }
      })
    },

    create_algorithm: function(req,res){
      var user = User.findOne({_id:req.params.user_id}, function(err, user){
        if (err){console.log(err);}
        else {console.log(user);
        user.algorithm.push(req.body);
        user.save();
        }
      });
      res.json({"body":req.body, "params":req.params});
    },

    get_algorithms:function(req,res){
      var user = User.findOne({_id:req.params.user_id},"algorithm",function(err,algorithms){
        if (err){console.log(err);}
        else {console.log(algorithms);
        res.json({users_algorithms:algorithms});
        }
      });
    }
  }
})();
