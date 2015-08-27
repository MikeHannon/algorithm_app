$(document).ready(function(){
  //set_handlers();
});

//helper functions
function set_handlers(){

  var editor = new Editor("editor","javascript");
  var chat = new Editor("chat","text");
  var consoles = new Editor("consoles","text");
  var pseudocodes = new Editor("pseudocodes","text");
  var hints = new Editor("hints","text");

  // $('#evaluate').click(function(){
  //   // var data= editor.editor.getValue();
  //   // evaluate_and_console_log(data);
  // });

  $('#console_tab, #editor_tab, #pseudocode_tab, #eval_tab, #hint_tab').click(function(){
      $(this).attr("class","blue-text active");
  });
   $('select').material_select();

   $('select').change(function(){
    //  event.preventDefault();
     console.log($(this).val());
     switch ($(this).val()){
     case "1":
      editor.setMode("javascript");
      break;
     case "2":
       editor.setMode("ruby");
       break;
     case "3":
       editor.setMode("PHP");
       break;
     case "4":
       editor.setMode("mySQL");
       break;
     case "5":
       editor.setMode("HTML");
       break;
     case "6":
       editor.setMode("python");
       break;
     case "7":
       editor.setMode("text");
       break;
     }
      return false;
   });
   return editor;
}

function size_consoles(){
  var assignment = $('#assignments').height();
  $('#editor, #chat, #eval, #hints, #consoles, #pseudocodes').css({"top": 140+assignment+"px"});
  console.log(assignment)
}

function evaluate_and_console_log(data, callback){
  //var data = solution.editor.getValue() + " " + test_code.editor.getValue();
  var myyield = eval(data);
   $('#eval').html(myyield);

  //evaluation.editor.setValue(myyield);
  //generates the console log and evaluat
  // var old = console.log;
  // var old2 = window.onerror;
  // var logger = document.getElementById('consoles');
  // var evaluate =
  // logger.innerHTML = "";
  // $('#eval').html("");
  // console.log = function (message) {
  //     if (typeof message == 'object') {
  //         logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
  //     } else {
  //         logger.innerHTML += message + '<br />';
  //     }
  // }
  //
  // window.onerror = function(msg, url, linenumber) {
  // logger.innerHTML += ('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+(linenumber));
  // }
  //
  // $('#eval').html(eval(data)); //document.getElementById('eval');
  //
  // // $('#console_tab').attr("class","white-text blue");
  // // $('#eval_tab').attr("class","white-text blue");
  // console.log = old;
  // window.onerror = old2;
  // //callback();
}
