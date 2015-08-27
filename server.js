var express = require('express');
// require path so that we can use path stuff like path.join
var path = require('path');
// instantiate the app
var app = express();
require('./server/config/mongoose.js');
require("./server/config/routes.js")(app);
app.use(express.static(path.join(__dirname, './client')));
// app.set('views',__dirname + '/views');

app.listen(8000, function() {

});
