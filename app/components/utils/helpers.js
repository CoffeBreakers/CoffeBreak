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
  },

  logoutUser: function()
  {
    console.log("logging out");
    return axios.get('/logout');
  },

  createUser: function(user)
  {
    console.log("creating user");
    console.log(JSON.stringify(user, null, 2));
    return axios.post('/signup', user);
  },

  loginLocalUser: function(user)
  {
    // console.log("logging in local user");
    // console.log(JSON.stringify(user, null, 2));
    return axios.post('/login', user);
  },

  updatePreferences: function(preferences)
  {
    console.log("updating user preferences");
    return axios.post('/user/preferences', preferences);
  }

  
};

// We export the helpers function (which contains getGithubInfo)
module.exports = helpers;
