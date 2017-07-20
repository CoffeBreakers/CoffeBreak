var User = require('../models/User.js');

module.exports = function(app, db)
{
    app.post('/user/preferences', function(req, res)
    {
        console.log(JSON.stringify(req.body, null, 2));
        User.findOneAndUpdate({"_id": req.body.id}, {"preferences": req.body.preferences})
        .exec(function(err, doc)
        {
            if(error)
            {
            console.log(error);
            }
            else
            {
            res.json(doc);
            }
        });
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