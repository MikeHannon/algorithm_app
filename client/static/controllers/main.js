algorithm_app.controller('mainController', function($scope, $routeParams, $location, $timeout, algorithmFactory, usersFactory) {
  var that = this;
  that.hints =0;
  that.type = 0;
  this.test_function = function(timers3){
    if (timers3.length > 0){
      clearInterval(timers3[0]);
    }
  }

  this.assignment = {title: "Selection Sort", goal: "Create a selection sort algorithm that will properly sort positive and negative numbers from an array.  This function must be named: selection_sort and take 1 parameter(an array) and <b>return</b> the sorted array.  Use <a href = 'https://en.wikipedia.org/wiki/Selection_sort'> this wikipedia</a> as a reference.", Threestars: "under 35 minutes", Twostars: "under 1hr and/or 1 hint", Onestar: "under 1.5 hrs and/or 2 hints", evaluation:"Function will properly deal with an empty array, positive and negative numbers, duplicate numbers and will be assessed for efficiency and order of operation", test: "var data = selection_sort([4,8,11,1]); if (String(data) !== '1,4,8,11'){'<p><b>not the right answer got ' + String(data) + ' expected 1,4,8,11 </b></p>'} else {'nice work: got ' + String(data) + ' expected 1,4,8,11'}"};

  this.evaluate = {};

  this.show_evaluations = function(assignment_test, user, timers3, callback, time_taken){
    console.log(algorithmFactory.show_single(function(data){console.log(data);}));
    that.type = 1;

    var data = that.evaluate.function.editor.getValue() + assignment_test.test_code;
    //catches failures!
    evaluate_and_console_log2(data, function(data){
      var failed = "failure";
      var failure_counter = 0;
      for (var i = 0; i < data.length - 7; i ++){
        if (data.substring(i,i+7) == failed){
          failure_counter ++;
        }
      }
      if (failure_counter == 0){
        console.log(callback);

        console.log(assignment_test);
        //resubmit_after, time_allowed
        var myData = {};
        myData.hints = that.hints;
        myData.time_to_resubmit = assignment_test.resubmit_after;
        myData.time_spent = assignment_test.time_allowed;
        myData.threestartime =time_taken.time_spent;
        console.log(time_taken, "INNNNNNNFOOOOOO");
        usersFactory.scoreAlgorithm(myData, assignment_test, callback);
        that.hints = 0;
        console.log(myData);

        clearTimeout(timers3[0]);
        timers3.pop();
      }
      if (failure_counter == 0){
        $timeout(function() {
            console.log(assignment_test);
      // usersFactory.reset_
          $('#algo_index_main').click();
          //that.type = 0;
        },3000)
      }
    });
    //submit
    $timeout(function() {
      $('#eval_tab').click();
      $('#console_tab').click();

    }, 100)
  //  timer.cancel();
  }

  this.show_evaluations2 = function(type){
    //event.stopPropagation();
    if (that.type == 0){
      var data = that.evaluate.function.editor.getValue();
      evaluate_and_console_log(data, function(){});
    }
    $timeout(function() {
    //  $('#eval_tab').click();

      $('#console_tab').click();
      that.type = 0;
    }, 100)
  //  timer.cancel();
  }

  this.show_evaluations3 = function(){
    that.type = 0;
    //event.stopPropagation();
    var data = that.evaluate.function.editor.getValue();
    evaluate_and_console_log(data, function(){});
    $timeout(function() {
      $('#eval_tab').click();
      $('#console_tab').click();
    }, 100);
  //  timer.cancel();
  }

  this.adjust_size = function(){
    $timeout(function(){
      size_consoles();
      var editor = set_handlers();
      that.evaluate = {function: editor};
    }, 500);
  }
  this.show_hint = function(data, kind){
    that.hints ++;
      console.log(data);
      var data2;
    //  if (typeof(hints) == undefined){
        hints = new Editor("hints","text");
        if (kind == 1){
          data2 = hints.editor.getValue() + "\n" + data;
        }
        if (kind == 2){
            data2 = hints.editor.getValue() + "\n Go to url:" + data;
        }
        hints.editor.setValue(data2);
        //console.log(get.Elem)
        //$timeout(function() {
            $('#hint_tab').click();
          //$('#console_tab').click();
    //    }, 100);

      // console.log(typeof(hints));
      // var current_data = hints.editor.getValue();
      // current_data += "</br>" +  data;
      // hints.editor.setValue(current_data);

  }
  that.endScore = function(){
    console.log("end!");
  }
  that.reset_algorithm = function(algo, user){
    console.log(algo);
    console.log(user);
    that.evaluate.function.editor.setValue(algo.starting_code);
  }
});
