var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
const test = require('./public/js/test')
const keys = require('./config');
const auth = require('./public/js/auth')
const defaults = require('./public/js/defaults');
 
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

test() 

console.log(auth.youtubeAPI('football'))


app.listen(3000);