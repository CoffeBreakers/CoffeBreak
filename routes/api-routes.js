// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************
var Article = require("../models/Article.js");
var Secrets = require("../configs/secrets.js");
var request = require("request");

// Routes
// =============================================================
module.exports = function(app, db)
{
//     `/api/saved` (get) - your components will use this to query MongoDB for all saved articles
    app.get("/api/saved", function(req, res)
    {
        Article.find({}, function(err, doc)
        {
            if(err)
            {
            console.log(err);
            res.status(500).send(err);
            }
            else
            {
            res.json(doc);
            }
        });
    });

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
//  * `/api/saved` (delete) - your components will use this to delete a saved article in the database
    app.delete("/api/saved", function(req, res)
    {
        Article.remove({"_id": req.body._id}, function(err, data)
        {
            if (err)
            {
            res.status(500);
            console.log(err);
            }
            else
            {
            res.json(data);
            }
        });
    })

    app.get("/api/home", function(req, res)
    {
    var categories = ['business', 'movies', 'arts', 'travel', 'world', 'politics','science','sports','fashion'];
        // console.log(req.body);
        for (var i = 0; i < categories.length; i++)
        {
          request.get(
            {
                url: "http://api.nytimes.com/svc/topstories/v2/" + categories[i] + ".json",
                qs: 
                {
                //  'api-key': Secrets.nyt_key,
                'api-key': Secrets.config.nyt_key,
                }
            }, function(err, response, body) 
            {
             body = JSON.parse(body);
             request.get(
                {
                    url: "http://api.smmry.com/&SM_API_KEY=" + Secrets.config.smmry_key + "&SM_LENGTH=5&SM_URL=" + body.url,
                }, function (err, res, body)
                {
                    title = JSON.parse(body)
                });
            // console.log(body);
            //console.log('RESPONSE: ', body)
            })
        }
  })
}
