// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

var helpers = {

  getArticles: function()
  {
    console.log("getting articles")
    return axios.get("/api/saved");
  },

  getUser: function(query)
  {
    return axios.get("/api/user");
  }
};

// We export the helpers function (which contains getGithubInfo)
module.exports = helpers;
