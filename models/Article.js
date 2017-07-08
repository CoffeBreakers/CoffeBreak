// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var ArticleSchema = new Schema({
  // title is a required string
  title: {
    type: String,
    required: true
  },
  // date is a date type
  date: {
    type: Date,
    required: true
  },
  // this saves the url
  url: {
    type: String,
    required: true,
    unique: true
  },
  //Stores the category that the article is. 
  category: {
    type: String,
    required: true
  },

  text: {
    type: String,
    required: true
  }


});

// Create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;
