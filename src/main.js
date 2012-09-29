var express = require('express');
var app = express();
var port = process.env.PORT || 9292;

app.set("view engine", 'ejs');
app.use(express['static'](__dirname +'/../public/'));

app.get('/', function(req, res) {

    res.render('index');

});

app.listen(port, function() {
    console.log("Server is listening on port %s...", port);
});