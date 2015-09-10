$("#starting_code").css({"height": "500px", "width":"50%"});
$("#test_code").css({"height": "500px", "width":"50%"});
$("#solution").css({"height": "500px", "width":"50%"});
$("#evaluation_of_start_and_test_code").css({"height": "500px", "width":"50%"});



var starting_code = new Editor("starting_code","javascript");
var test_code = new Editor("test_code","javascript");
var solution = new Editor("solution","javascript");
var evaluation_of_start_and_test_code = new Editor("evaluation_of_start_and_test_code", "text");
var start_code_bool = false;
var test_code_bool = false;
var solution_code_bool = false;

function load_info(){
  if (test_code.editor.getValue().length < 1){
  var data = $('[ng-controller="algorithmController as algorithm"]').scope().algorithm.show_algorithm;
  solution.editor.setValue(data.solution);
  starting_code.editor.setValue(data.starting_code);
  test_code.editor.setValue(data.test_code);
}
//  console.log(data.test_code);
  //var param1 = document.getElementById("myVar").value;
    //console.log( param1 );

}

//console.log(starting_code);

// starting_code.editor.setValue("Use this window to set the starting info you want students to begin with \n test code is to the right w/ an example \n it will test the code on the bottom \n(this doubles as the solution code on save after your testing is set), \n evaluated code will be in the bottom right.\n\n\n Comparing to console logs is challenging:\n Use the following example\n var k = [];\n(function(){\n k = [];\n var exLog = console.log;\n console.log = function(msg){\n k.push(msg);\n exLog.apply(this,arguments);}})()\n run the function e.g.\n function helloworld(){console.log('hello world');} helloworld(); \n k[0] at this point should be 'hello world' \n then compare to expected result to k (or k[0] if you just have a single console.log event)\n", -1);
//
// test_code.editor.setValue("", -1);
// solution.editor.setValue("", -1);
// evaluation_of_start_and_test_code.editor.setValue("", -1);
//
// test_code.editor.setValue("if (helloworld() == 'hello world'){\n'nice work'\n}\n else{'this is just a test'\n}");
// solution.editor.setValue("function helloworld(){\nreturn ('hello world');\n}\n <!--   this should pass your test in the end --> \n");
//
// evaluation_of_start_and_test_code.editor.setValue("This is just so you can test your test and then test your solution - it doesn't get saved anywhere");

function evaluate_solutions(){
  var data = solution.editor.getValue() + " " + test_code.editor.getValue();
  var myyield = eval(data);
  evaluation_of_start_and_test_code.editor.setValue(myyield);
  //eval(data);
//  console.log(eval(data));
}
