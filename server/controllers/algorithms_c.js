var mongoose = require('mongoose');
var Algorithm = mongoose.model('Algorithm');
console.log("algo  scontroller");

module.exports = (function() {
  return {
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
    }
  }
})();
