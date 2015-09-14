var socket = io();
$(document).ready(function(){

});

//helper functions
function set_handlers(){

  var editor = new Editor("editor","javascript");
  var chat = new Editor("chat","javascript");
  var consoles = new Editor("consoles","text");
  var pseudocodes = new Editor("pseudocodes","text");
  var hints = new Editor("hints","text");

  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

  chat.editor.on("change",function(e){
    if (e.lines.length == 2 && e.action == "insert"){
    //  console.log(document.cookie());
    //  console.log(e);
    //  console.log(chat.editor.session.getLine(e.start.row));
      //socket emitters
      socket.emit("chat_input",{response: chat.editor.session.getLine(e.start.row), first_name:getCookie('first_name'), level:getCookie('admin_level')});
    }
  });

  //socket listeners
  socket.on("return_chat",function(data){
    var cursor_position = chat.editor;
    var user_type = "";
    if (data.level == 2){
      user_type = "(instructor)";
    }
    chat.editor.moveCursorToPosition({row:1, column:0});
    chat.editor.insert("\n"+data.first_name+user_type+": "+data.response +"\n");
    chat.editor.moveCursorToPosition({row:1,column:0});
    chat.editor.removeLines();
    chat.editor.moveCursorToPosition({row:0, column:chat.editor.session.$rowLengthCache[0]});
    //console.log(chat.editor.session.$rowLengthCache[0]);
    console.log(data);});
  socket.on("self_chat_return", function(data){
    chat.editor.moveCursorToPosition({row:1, column:0});
    chat.editor.insert("\n"+"You"+": "+data.response +"\n");
    chat.editor.moveCursorToPosition({row:3,column:0});
    chat.editor.removeLines();
    chat.editor.moveCursorToPosition({row:0, column:0});
    chat.editor.removeLines();

  });




  $('#evaluate').click(function(){
    // var data= editor.editor.getValue();
    // evaluate_and_console_log(data);
  });

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

function evaluate_and_console_log2(data, callback){

  //var data = solution.editor.getValue() + " " + test_code.editor.getValue();
  var myyield = eval(data);
  callback(myyield)
  // evaluation_of_start_and_test_code.editor.setValue(myyield);
  $('#eval').html(myyield);

}


function evaluate_and_console_log(data, callback){

  //generates the console log and evaluat
  var old = console.log;
  var old2 = window.onerror;
  var logger = document.getElementById('consoles');
  var evaluate =
  logger.innerHTML = "";
  $('#eval').html("");
  console.log = function (message) {
      if (typeof message == 'object') {
          logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
      } else {
          logger.innerHTML += message + '<br />';
      }
  }

  window.onerror = function(msg, url, linenumber) {
  logger.innerHTML += ('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+(linenumber));
  }

  $('#eval').html(eval(data)); //document.getElementById('eval');

  // $('#console_tab').attr("class","white-text blue");
  // $('#eval_tab').attr("class","white-text blue");
  console.log = old;
  window.onerror = old2;
  callback();
}
