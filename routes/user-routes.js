var User = require('../models/User.js');

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

    app.get('/api/preferredArticles', function(req, res)
    {
        console.log(Json.stringify(req.user));
        var toReturn = [];
        
    });
}

// Tank.findById(id, function (err, tank) {
//   if (err) return handleError(err);
  
//   tank.size = 'large';
//   tank.save(function (err, updatedTank) {
//     if (err) return handleError(err);
//     res.send(updatedTank);
//   });
// });