
var LocalStrategy = require("passport-local").Strategy;

module.exports = function(app, db, passport)
{
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/');
    });

    app.get('/api/user', function(req, res)
    {
        res.json(req.user);
        res.redirect('/');
    });

    app.get('/logout', function(req, res)
    {
        req.logout();
        res.redirect('/');
    });

	// app.get('/signup',function(req,res){
	// 	res.render("signup",{message:req.flash('signupMessage')})
	// })

	app.get('/login',function(req,res){
		res.render("/",{message:req.flash("loginMessage")})
	})

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/',
		failureFlash: true
	}));

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/',
		failureFlash: false
	}));

	app.get('/profile',function(req,res){
		res.render("profile",{user:req.user})
	})


}
// route to middleware to make sure user is logged in
function isLoggedIn(req, res, next) {

    // if user is logged in -
    if (req.isAuthentiated())
        return next();

    // if they aren't redirect them to home
    res.redirect('/');
}
