
var LocalStrategy = require("passport-local").Strategy;

module.exports = function(app, db, passport) 
{
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    });

    app.get('/api/user', function(req, res)
    {
        res.json(req.user);
    });

    app.get('/logout', function(req, res) 
    {
        req.logout();
        res.redirect('/');
    });
}