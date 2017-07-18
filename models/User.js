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
  },

  world_news: 
  {
    type: Boolean,
    default: true
  },

  politics: 
  {
    type: Boolean,
    default: true
  },

  science: 
  {
    type: Boolean,
    default: true
  },

  movies: 
  {
    type: Boolean,
    default: true
  },

  business: 
  {
    type: Boolean,
    default: true
  },

  arts: 
  {
    type: Boolean,
    default: true
  },

  travel: 
  {
    type: Boolean,
    default: true
  },

  sports: 
  {
    type: Boolean,
    default: true
  },

  fashion: 
  {
    type: Boolean,
    default: true
  },
});

// Create the Article model with the ArticleSchema
var User = mongoose.model("User", UserSchema);

// Export the model
module.exports = User;
