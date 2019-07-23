const firebase = require('firebase');
var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
const test = require('./public/js/test')
const keys = require('./config');
const authAPI = require('./public/js/auth')
const sections = require('./public/data/sampleSections')
var bodyParser = require('body-parser')

// Database configuration
let currentUser = '';

var firebaseConfig = {
    apiKey: keys.dbKey,
    authDomain: "app-galvanize.firebaseapp.com",
    databaseURL: "https://app-galvanize.firebaseio.com",
    projectId: "youtube-app-galvanize",
    appId: "1:142923113115:web:911d986153c88176"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Auth and Firestore references
const auth = firebase.auth();
const db = firebase.firestore();

function addVideo() {
    db.collection('playlist')
        .doc('videos')
        .set({
            href: 'test.com',
            title: 'Title Test'
        });
}

function addToPlaylist(id) {
    return db.collection('playlist')
        .doc('videos')
        .update({
            videos: firebase.firestore.FieldValue.arrayUnion(id),
        });
}

function getPlaylist() {
    return db.collection('playlist')
        .doc('videos')
        .get()
        .then(snapshot => {
            snapshot.data().videos
        })
}

var app = express();

app.engine('handlebars', exphbs({
    partialsDir: [
        //  path to your partials
        path.join(__dirname, 'views/partials'),
    ]
}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get('/', function(req, res) {
    // authAPI.youtubeAPI().then(sections => {

    // });
    db.collection('playlist')
        .doc('videos')
        .get()
        .then(snapshot => {
            res.render('home', { sections: sections, videos: snapshot.data().videos});
        })
});

app.post('/playlist/:id', function(req, res) {
    addToPlaylist(req.params.id).then(() => {
        res.redirect('/')
    })
    
})





app.listen(3000);