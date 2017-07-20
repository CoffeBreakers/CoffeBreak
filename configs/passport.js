// load all the things we need for Google Auth
var LocalStrategy = require("passport-local").Strategy;
var bcrypt   = require('bcrypt');

var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
var User = require("../models/User.js");

// load the auth variables
if(!process.env.NODE_ENV){
  var secrets = require('../configs/secrets.js');
}


module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        // console.log("in serialize");
        // console.log("user: " + JSON.stringify(user));
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        // console.log("in deserialize");
        User.findById(id, function(err, user) 
        {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL ==================================================================
    // =========================================================================

    	passport.use('local-signup',new LocalStrategy({
		usernameField:'user_name',
		passwordField:'password',
		// passReqToCallback:false
	},
	function(req,user_name,password,done){
		console.log("login route")
		User.findOne({'local.user_name':user_name},function(err,user){
				if(err)
					return done(err);
				if(user){
					return done(null,false,req.flash("signupMessage","That username already taken"))
				}
				if(!req.user){
					var newuser = new User();
					newuser.user_name = user_name;
					newuser.password = password;
					bcrypt.genSalt(10, function(err, salt) {
					    bcrypt.hash(newuser.password, salt, function(err, hash) {
					    	
					        newuser.password = hash;
					        console.log(newuser,"newuser")
					        newuser.save(function(err,user){
								if(err) throw err;
								return done(null,newuser);
							})
					    });
					});
				}else{
					var newuser = req.user;
					console.log(newuser,"newuser")
					newuser.local.username = email;
					newuser.local.password = password;
					newuser.save(function(err){
	    				if(err)
	    					throw err;
	    				return done(null,newuser)

	    			})
				}
			})
		
	}

	))

	passport.use("local-login",new LocalStrategy({
		usernameField:'user_name',
		passwordField:'password',
		// passReqToCallback:false
	},
	function(req,user_name,password,done){
		process.nextTick(function(){
			User.findOne({'local.user_name':user_name},function(err,user){	
				if(err)
					return done(err);
				if(!user)
					return done(null,false,req.flash("loginMessage","No user found"))
				
				bcrypt.compare(password, user.password, function(err, res) {
					
				   if(err) throw err;
			   		if(res){
			   			console.log(req.user,"req")
			   			return done(null, user);
			   		} else {
			   			return done(null, false, req.flash("loginMessage","Invalid password"));
			   		}
				});
			})
		})
	}
	))

    // =========================================================================
    // END LOCAL ==================================================================
    // =========================================================================





    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    //console.log(secrets);
    passport.use(new GoogleStrategy({
        clientID        : process.env.google_client_id || secrets.config.googleClientID,
        clientSecret    : process.env.google_client_secret || secrets.config.googleClientSecret,
        callbackURL     : process.env.callback_url || secrets.config.CALLBACK_URL,
        // passReqToCallback : false
    },
    function(req, token, refreshToken, profile, done) {
        // console.log("req: " + JSON.stringify(req.body));
        //console.log("token: " + JSON.stringify(token));
        // console.log("refresh token: " + JSON.stringify(refreshToken));
        //console.log("profile: " + JSON.stringify(profile, null, 4));
        // console.log("done: " + JSON.stringify(done));
        // console.log("\n\n==============================================")
        //make the code asynchronous
        //User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() 
        {
            User.find({googleID: profile.id }, function(err, user)
            {
                //console.log(user);
                if(err)
                {
                //console.log(err);
                res.status(500).send(err);
                }
                else
                {
                    // if the user is found, then just return that user. 
                    if(user != undefined && user != null && user.length > 0)
                    {
                        return done(null, user[0]);
                    }
                    else
                    {
                        //code for creation of a new user object that will be created. 
                        var newUser = new User();
                        newUser.googleID = profile.id;
                        newUser.token = token;
                        newUser.user_name = profile.displayName;
                        newUser.email = profile.emails[0].value;
                        newUser.photo = profile.photos[0].value;
                        
                        User.create(newUser, function(err, user)
                        {
                            if(err)
                            {
                            console.log(err);
                            res.status(500).send(err);
                            }
                            else
                            {
                            //console.log("returned user = " + user);
                            return done(null, user);
                            }
                        });
                    }
                }
            });
        });

    }));

    //=======================================END GOOGLE===============================================//
};
