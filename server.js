// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var passport = require('passport');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Requiring Mongoose models
var Article = require("./models/Article.js");
var request = require("request");
var Secrets = require("./configs/secrets.js");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Initialize Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: false}));

// Make public a static dir
app.use(express.static("public"));

require('./configs/passport.js')(passport);
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'whynotzoidberg'}));
app.use(passport.initialize());
app.use(passport.session());

// Database configuration with mongoose
//if in production, set uri to be production env variable, otherwise connect to the localhost uri.
var databaseURI = (process.env.MONGODB_URI
  ? process.env.MONGODB_URI
  : "mongodb://localhost/coffeebreak");
mongoose.connect(databaseURI);
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

var JSONobject = {
  nytimes: null,
  summary: []
};
var categories = ['business', 'movies', 'technology', 'books', 'travel']/* 'theater', 'automobiles', 'travel'
  //*/
//var categories = ['business']
// console.log(req.body);
for (var i = 0; i < categories.length; i++) {
  request.get({
    url: "http://api.nytimes.com/svc/topstories/v2/" + categories[i] + ".json",
    qs: {
      'api-key': Secrets.config.nyt_key
    }
  }, function(err, response, body) {
    // console.log('body')
    // console.log(body)
    body = JSON.parse(body);
    JSONobject.nytimes = body.results.slice(0, 2);
    console.log('body: ', JSONobject.nytimes);
    //var title = body.results.slice(0,5)
    //res.send('success')
    //console.log(`body: ${ JSON.stringify(body, null, 2) }`);
    //console.log(`typeof body: ${ typeof body }`);
    //for (var j=0; j<body.results.length; j++){
    JSONobject.nytimes.forEach((article) => {
      let url = "http://api.smmry.com/&SM_API_KEY=" + Secrets.config.smmry_key + "&SM_LENGTH=5&SM_URL=" + article.url
      //  console.log("Results :", url)
      // console.log(`URL: ${ url }`)
      request.get({
        url
      }, function(err, res, body) {

        // title = JSON.parse(url);
        console.log('SUMMARIZEDDDD: ', JSON.parse(body));
        JSONobject.summary.push(JSON.parse(body));


        console.log('THIS IS JSONOBJECT: ', JSONobject);
        // SAVE TO DB
        var newArticle = new Article({
            title: JSONobject.nytimes[0].title,
            date: JSONobject.nytimes[0].published_date,
            url: JSONobject.nytimes[0].url,
            category: JSONobject.nytimes[0].section,
            text: JSONobject.summary[0].sm_api_content,
            img: JSONobject.nytimes[0].multimedia[0].url
        })
        console.log("new Article: " + JSON.stringify(newArticle, null, 2));
        Article.create(newArticle, function(err, doc) {
        //newArticle.save(function(err, doc){
          if (err) {
            console.log(err);
            // res.status(500).send(err);
          } else {
            console.log("DOCCCCC = ", doc);
            // res.json(doc);
          }

        })
      })
    })
  })
}

// Routes
// ======
require("./routes/html-routes.js")(app, db);
require("./routes/api-routes.js")(app, db);
require("./routes/login-routes.js")(app, db, passport);

//sets port variable to process.env.port if exists or 3000 if not.
const PORT = process.env.PORT || 3000;
// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on " + PORT);
});
