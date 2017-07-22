// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
const passport = require('passport')
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Requiring Mongoose models
var Article = require("./models/Article.js");
var request = require("request");
if (!process.env.NODE_ENV)
{
  var Secrets = require("./configs/secrets.js");
}
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// flash middleware
var flash = require('connect-flash');

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
app.use(flash());
app.use(passport.session());


// Database configuration with mongoose
//if in production, set uri to be production env variable, otherwise connect to the localhost uri.
var databaseURI = (process.env.MONGODB_URI? process.env.MONGODB_URI: "mongodb://localhost/coffeebreak");
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



// Routes
// ======
require("./routes/html-routes.js")(app, db);
require("./routes/api-routes.js")(app, db);
require("./routes/login-routes.js")(app, db, passport);
require("./routes/user-routes.js")(app, db);

//sets port variable to process.env.port if exists or 3000 if not.
const PORT = process.env.PORT || 3000;
// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on " + PORT);
});
