var mongoose = require('mongoose');
var Algorithm = mongoose.model('Algorithm');


module.exports = (function() {
  return {
    delete: function(req,res){
      Algorithm.remove({_id:req.params.id}, function(err, response){
        res.json({"done":"done"});
      });
    },

    index: function (req,res){
      Algorithm.find({}, function(err, algorithms) {
        if (err){
          res.json({"error":err});
        }
        else {res.json(algorithms);}
      });
    },

    create: function (req,res){
      algorithm = new Algorithm(req.body);
      algorithm.save(function(err, new_example) {
        if(err) {
          var errs = [];
          for (var error in err.errors){
            errs.push(err.errors[error]);
          }
          res.json({"errors": errs});
        }
        else{
          res.json({"create":"true"});
        }
      });
    },

    update: function(req,res){
      req.body.updated_at = Date.now();
      Algorithm.update({_id:req.params.id},{$set: req.body},function (err,data){
        if (err) {return "fail";}
        res.json(data);
      });
    },


  }
})();
