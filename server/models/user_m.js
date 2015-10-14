var mongoose = require('mongoose');

var algorithms = new mongoose.Schema({
  score:'number', //0,1,2,3
  unlocked:'boolean',
  algo_id: mongoose.Schema.Types.ObjectId,
  time_spent:'number',
  created_at:{type:Date,default:Date.now},
  updated_at:{type:Date,default:Date.now},
  prev_solution:'string',
  current_solution:'string',
  working_solution:'string',
  threestartime:'number',
  time_to_resubmit:'number',
  date_started:{type:Date,default:Date.now}, // for our timers...
  solution_efficiency:'number', // score!
  algorithm_type:'string',
  keyStrokes:"number",
  restart_time:'Date',
  difficulty:"number"
});

var schema = new mongoose.Schema(
  { first_name: 'string',
    last_name: 'string',
    password: 'string',
    admin_level: 'number',
    algorithm:[algorithms],
    email:'string',
    token:'string',
    group:'string',
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
    }
);
//relational with algorithm through state?

var user = mongoose.model('User', schema);

schema.path('first_name').required(true);
schema.path('last_name').required(true);
schema.path('password').required(true);
schema.path('admin_level').required(true);
schema.path('token').required(true);
schema.path('created_at').required(true);
schema.path('updated_at').required(true);

//user.algorithm[].algo_id = algorithms.id...
