var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../../models/userModel');
module.exports = function(){
	passport.use(new FacebookStrategy({
		clientID: '1617228834969795',
		clientSecret: 'eaa57dfdbb3a243c83d3b1a17762cc40',
		callbackURL: 'http://localhost:3000/auth/facebook/callback',
		passReqToCallback: true
	},
	function (req, accessToken, refreshToken, profile, done) {
             var query = {
                'facebook.id': profile.id
            };

            User.findOne(query, function (error, user) {
                if (user) {
                    console.log('found');
                   
                    done(null, user);
                } else {
                    console.log('not found');
                    var user = new User;
                    console.log(profile);
                    if(profile.emails!= null){
                        user.email = profile.emails[0].value;
                    }
                    
                    //user.image =
                    //    profile._json.profile_image_url;
                    user.displayName = profile.displayName;

                    user.facebook = {};
                    user.facebook.id = profile.id;
                    user.facebook.token = accessToken;
                    user.save();
                    done(null, user);
                }
            })
           
    }));
} 
            