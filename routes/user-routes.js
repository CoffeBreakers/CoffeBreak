var User = require('../models/User.js');

module.exports = function(app, db, passport)
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