//Placeholder for User, need to be changed. 

// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var UserSchema = new Schema({
  // title is a required string
  title: {
    type: String,
    required: true,
    unique: true
  },
  // date is a date type
  date: {
    type: Date,
    required: true
  },
  // This only saves one note's ObjectId, ref refers to the Note model
  url: {
    type: String,
    required: true
  }
});

// Create the Article model with the ArticleSchema
var User = mongoose.model("User", UserSchema);

// Export the model
module.exports = User;
