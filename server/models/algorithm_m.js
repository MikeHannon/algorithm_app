var mongoose = require('mongoose');
console.log("algorithm model");


var schema = new mongoose.Schema(
  { title: 'string',//
    goal: 'string',//
    Onestar: 'string',//
    Twostars: 'string',//
    Threestars:'string',//
    Bonus:'string',//
    Evaluation:'string',//
    starting_code:'string', //need
    test_code:'string', //need
    solution:'string', //need
    supp_materials:[],//
    hint1:'string',//
    hint2:'string',//
    hint3:'string',//
    hint1_time:'number',//
    hint2_time:'number',//
    hint3_time:'number',//
    prev_solution_unlock_time:'number',//
    hint1_keystrokes:'number',//
    hint2_keystrokes:'number',//
    hint3_keystrokes:'number',//
    prev_solution_unlock_keystroke:'number',//
    time_allowed:'number',//
    difficulty:'number',//
    type:'string',//
    degradation_rate:'number',//
    resubmit_after:'number',
    approx_order:'number', //resubmit
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
    }
);
//relational with algorithm through state?

var algorithm = mongoose.model('Algorithm', schema);

schema.path('title').required(true);
schema.path('goal').required(true);
schema.path('Onestar').required(true);
schema.path('Twostars').required(true);
schema.path('Threestars').required(true);
schema.path('Bonus').required(true);
schema.path('Evaluation').required(true);
schema.path('starting_code').required(true);
schema.path('test_code').required(true);
schema.path('solution').required(true);
//schema.path('supp_materials').required(true);
schema.path('hint1').required(true);
schema.path('hint2').required(true);
schema.path('hint3').required(true);
schema.path('hint1_time').required(true);
schema.path('hint2_time').required(true);
schema.path('hint3_time').required(true);
schema.path('hint1_keystrokes').required(true);
schema.path('hint2_keystrokes').required(true);
schema.path('hint3_keystrokes').required(true);
schema.path('prev_solution_unlock_time').required(true);
schema.path('prev_solution_unlock_keystroke').required(true);

schema.path('time_allowed').required(true);
schema.path('difficulty').required(true);
schema.path('type').required(true);
schema.path('resubmit_after').required(true);




// EXAMPLE this.assignment = {title: "Selection Sort", goal: "Create a selection sort algorithm that will properly sort positive and negative numbers from an array.  This function must be named: selection_sort and take 1 parameter(an array) and <b>return</b> the sorted array.  Use <a href = 'https://en.wikipedia.org/wiki/Selection_sort'> this wikipedia</a> as a reference.", Threestars: "under 35 minutes", Twostars: "under 1hr and/or 1 hint", Onestar: "under 1.5 hrs and/or 2 hints", evaluation:"Function will properly deal with an empty array, positive and negative numbers, duplicate numbers and will be assessed for efficiency and order of operation", test: "var data = selection_sort([4,8,11,1]); if (String(data) !== '1,4,8,11'){'<p><b>not the right answer got ' + String(data) + ' expected 1,4,8,11 </b></p>'} else {'nice work: got ' + String(data) + ' expected 1,4,8,11'}"};
