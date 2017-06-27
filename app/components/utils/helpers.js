// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Geocoder API
var geocodeAPI = "35e5548c618555b1a43eb4759d26b260";

// Helper Functions (in this case the only one is runQuery)
var helpers = {

  getArticles: function()
  {
    console.log("getting articles")
    return axios.get("/api/saved");
  },

  saveArticle: function(article)
  {
    return axios.post("/api/saved", article);
  },

  deleteArticle: function(articleID)
  {
    return axios.delete("/api/saved/"+ articleID)
  },

  runQuery: function(query)
  {
    return axios.post("/api/search", query);
  }

  
};

// We export the helpers function (which contains getGithubInfo)
module.exports = helpers;
