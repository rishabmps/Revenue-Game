var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(){
	passport.use(new FacebookStrategy({
		clientID: '1617228834969795',
		clientSecret: 'eaa57dfdbb3a243c83d3b1a17762cc40',
		callbackURL: 'http://localhost:3000/auth/facebook/callback',
		passReqToCallback: true
	},
	function (req, accessToken, refreshToken, profile, done) {

            var user = {};

            user.email = profile.emails[0].value;
            //user.image =
            //    profile._json.profile_image_url;
            user.displayName = profile.displayName;

            user.facebook = {};
            user.facebook.id = profile.id;
            user.facebook.token = accessToken;

            done(null, user);
        }));
}