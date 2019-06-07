var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
 
var app = express();
 
app.engine('handlebars', exphbs({
  partialsDir  : [
    //  path to your partials
    path.join(__dirname, 'views/partials'),
  ]
}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('home');
});
 
app.listen(3000);