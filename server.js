var express = require('express');
// require path so that we can use path stuff like path.join
var path = require('path');
// instantiate the app
var app = express();
require('./server/config/mongoose.js');
require("./server/config/routes.js")(app);
app.use(express.static(path.join(__dirname, './client')));
// app.set('views',__dirname + '/views');
var server = require('http').Server(app);
// app.listen(8000, function() {
//  console.log("listening on port 8000");
// })
//app.set("views")
//app.set("static")
server.listen(8000, function() {
  console.log("listening, port 3000");
});

var io = require('socket.io')(server);


io.sockets.on('connection', function (socket) {
  socket.on("chat_input", function(data){console.log(data);
//socket.emit("self_chat_return", data); // you
    socket.broadcast.emit("return_chat",data); //instructor to everyone but me
    io.emit("return_chat",data); // instructor to everyone
  });
})
