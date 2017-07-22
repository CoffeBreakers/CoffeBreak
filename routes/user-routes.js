var User = require('../models/User.js');
var request = require("request");
if (!process.env.NODE_ENV)
{
  var Secrets = require("../configs/secrets.js");
}
var Article = require("../models/Article.js");

module.exports = function(app, db)
{
    app.post('/user/preferences', function(req, res)
    {
        console.log(JSON.stringify(req.body, null, 2));
        User.findOneAndUpdate({"_id": req.body._id}, req.body)
        .exec(function(err, doc)
        {
            if(err)
            {
            console.log(err);
            }
            else
            {
            res.json(doc);
            }
        });
    });

    app.get('/api/bingarticles', function(req, res)
    {
        //console.log(JSON.stringify(req.user));
        //console.log("in bingarticles");
        let cutoff = new Date();
        cutoff.setDate(cutoff.getDate()-2);
        Article.find({date: {$gte: cutoff}}, function(err, docs)
        {
            //console.log("in articles callback function");
            if(err)
            {
                console.log(err);
                res.status(500).send(err);
            }
            else
            {
                //console.log(docs);
                res.json(docs);
            }
        });
        
    });

    app.get('/api/downloadbing', function(req, res)
    {
        request.get(
            {
                url: "https://api.cognitive.microsoft.com/bing/v5.0/news",
                headers:
                {
                    'Ocp-Apim-Subscription-Key': process.env.bing_key || Secrets.config.bing_key,
                    'X-MSEdge-ClientID': '0F4C92B7D98C62592D139872D8D3632C',
                    'mkt': 'en-us HTTP/1.1',
                }
            }, function(err, response, body)
            {
                
                var parsedBody = JSON.parse(response.body);
                //console.log(JSON.stringify(parsedBody, null, 2));
                console.log('There are ' + parsedBody.value.length + ' articles in the response');
                parsedBody.value.forEach(function(element)
                {
                    var newArticle = new Article();
                    newArticle.title = element.name;
                    newArticle.date = element.datePublished;
                    newArticle.url = element.url;
                    newArticle.category = element.category;
                    newArticle.text = element.description;

                    console.log(typeof(element.image));
                    if(element.image !== undefined)
                    {
                        newArticle.img = element.image.thumbnail.contentUrl
                    }
                    
                    newArticle.save();
                });
            });
    });
}

