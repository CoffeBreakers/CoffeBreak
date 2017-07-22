// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************
var Article = require("../models/Article.js");
if (!process.env.NODE_ENV)
{
  var Secrets = require("../configs/secrets.js");
}

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
    let cutoff = new Date();
    cutoff.setDate(cutoff.getDate()-1);

    Article.find({date: {$gte: cutoff}}, function(err, doc) {
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

  app.get("/api/delete-all", function(req, res) {
    Article.remove({}, function(err, data)
    {
      if(err)
      {
        res.status(500).send(err)
      }
      else
      {
        res.json(data);
      }
    })
  });

  app.get("/api/download-articles", function(req, res)
  {
    var categories = ['world', 'national', 'politics', 'business', 'technology', 'sports', 'science', 'movies', 'books', 'travel']
      var timeout = 0;
      for (var i = 0; i < categories.length; i++)
      {
        setTimeout(downloadCategory.bind(null, categories[i]), timeout);
        timeout += 7000;
      }
    res.redirect("/");
  })

  app.get("/api/download-articles/:category", function(req, res)
  {
    downloadCategory(req.params.category);
    res.redirect("/");
  });
}

function downloadCategory(category)
{
  console.log("getting category: " + category);
  var JSONobject = {
      nytimes: null,
      summary: []
    };
  request.get({
        url: "http://api.nytimes.com/svc/topstories/v2/" + category + ".json",
        qs: {
          'api-key': process.env.nyt_key || Secrets.config.nyt_key
        } 
      }, function(err, response, body) {
        //console.log(body)
        body = JSON.parse(body);
        if (body.results === undefined)
        {
          return;
        }
        JSONobject.nytimes = body.results.slice(0, 3);
        //console.log('body: ', JSONobject.nytimes);
        //var title = body.results.slice(0,5)
        //res.send('success')
        //console.log(`body: ${ JSON.stringify(body, null, 2) }`);
        //console.log(`typeof body: ${ typeof body }`);
        //for (var j=0; j<body.results.length; j++){
        JSONobject.nytimes.forEach((article) => {
          let url = "http://api.smmry.com/&SM_API_KEY=" + ((process.env.NODE_ENV) ? process.env.smmry_key : Secrets.config.smmry_key) + "&SM_LENGTH=5&SM_URL=" + article.url
          //  console.log("Results :", url)
          // console.log(`URL: ${ url }`)
          //console.log(url);
          request.get({url}, function(err, res, body) {
            // title = JSON.parse(url);
            //console.log('SUMMARIZEDDDD: ', JSON.parse(body));
            JSONobject.summary.push(JSON.parse(body));

            //get the correct image url for the article. 
            var tempImgURL;
            for(var i = 0; i < article.multimedia.length; i++)
            {
              if(article.multimedia[i].format === 'mediumThreeByTwo210')
              {
                tempImgURL = article.multimedia[i].url;
              }
            }
            //category preprocessing. in nytimes they call business: business day. 
            //turn anything that doens't correspond to our category into one suitable for coffeebreak'
            
            
            //console.log('THIS IS JSONOBJECT: ', JSONobject);
            // SAVE TO DB
            var newArticle = new Article({
                title: article.title,
                date: article.published_date,
                url: article.url,
                category: category,
                text: JSON.parse(body).sm_api_content,
                img: tempImgURL
            })
            //console.log("new Article: " + JSON.stringify(newArticle, null, 2));
            Article.create(newArticle, function(err, doc) 
            {
            //newArticle.save(function(err, doc){
              if (err) {
                console.log(err);
                // res.status(500).send(err);
              } else {
                //console.log("DOCCCCC = ", doc);
                // res.json(doc);
              }

            })// end of article creation callback
          }) //end of smmry ajax call
        })
      }) //end of new york times api. 
}
