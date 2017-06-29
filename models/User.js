//Placeholder for User, need to be changed. 

// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var UserSchema = new Schema({
  // title is a required string
  user_name: {
    type: String,
    required: true
  },
  
  googleID: 
  {
      type: String
  },

  token:
  {
      type: String
  },

  email:
  {
      type: String
  },

  photo:
  {
    type: String
  }

});

// Create the Article model with the ArticleSchema
var User = mongoose.model("User", UserSchema);

// Export the model
module.exports = User;
