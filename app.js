let express = require('express');
let app = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let port = process.env.PORT || 8000;
let movie = require('./routes/movie');
let comment = require('./routes/comment');
let config = require('config'); //db connects from config

//db options
let options = { 
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } 
  }; 

//db connect
mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//prepare bodyParser
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  

//GET & POST for /movies
app.route('/movies')
.get(movie.getMovies)
.post(movie.postMovie);

app.route('/movies/:year/:sort')
.get(movie.getFiltMovies);

//GET & POST for /comments
app.route('/comments')
.get(comment.getComments)
.post(comment.postComment);

app.route('/comments/:id')
.get(comment.getComment);

//Server listening
app.listen(port);
console.log("Server started on port " + port);

module.exports = app; // for testing