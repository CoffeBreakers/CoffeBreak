// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************
var Article = require("../models/Article.js");
var Secrets = require("../configs/secrets.js");
var request = require("request");

// Routes
// =============================================================
module.exports = function(app, db) {


  //  * `/api/saved` (post) - your components will use this to save an article to the database
    app.post("/api/saved", function(req, res)
    {
        console.log("request body: ", req.body);
        var newArticle = new Article(req.body);
        console.log("new Article: " + JSON.stringify(newArticle, null, 2));
        Article.create(newArticle, function(err, doc)
        {
            if(err)
            {
            console.log(err);
            res.status(500).send(err);
            }
            else
            {
            console.log("returned doc = " + doc);
            res.json(doc);
            }
        })
    });
  //     `/api/saved` (get) - your components will use this to query MongoDB for all saved articles
  app.get("/api/saved", function(req, res) {
    Article.find({}, function(err, doc) {
      if (err) {
        console.log(doc);
        res.status(500).send(err);
      } else {
        res.json(doc);
      }
    });
  });

  //  * `/api/saved` (delete) - your components will use this to delete a saved article in the database
  app.delete("/api/saved", function(req, res) {
    Article.remove({
      "_id": req.body._id
    }, function(err, data) {
      if (err) {
        res.status(500);
        console.log(err);
      } else {
        res.json(data);
      }
    });
  })
}
//)body.results.slice(0,1)
//}
