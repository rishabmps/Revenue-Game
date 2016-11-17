var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../../models/userModel');
var config = require('../properties');
module.exports = function() {
    passport.use(new FacebookStrategy({
            clientID: config.facebookAuth.clientID,
            clientSecret: config.facebookAuth.clientSecret,
            callbackURL: config.facebookAuth.callbackURL,
            passReqToCallback: true
        },
        function(req, accessToken, refreshToken, profile, done) {
            var query = {
                'facebook.id': profile.id
            };

            User.findOne(query, function(error, user) {

                if (error) {
                    console.error("Error while finding the user in facebook authentification", error);
                }

                if (user) {
                    console.log('found');
                    done(null, user);
                } else {
                    console.log('not found');
                    var user = new User;
                    if (profile.emails != null) {
                        user.email = profile.emails[0].value;
                    }
                    //user.image =
                    //    profile._json.profile_image_url;
                    user.displayName = profile.displayName;
                    user.id = profile.id;
                    user.source = "facebook";
                    user.facebook = {};
                    user.facebook.id = profile.id;
                    user.facebook.token = accessToken;
                    console.log("Adding user:")
                    console.log(user);
                    user.save();
                    done(null, user);

                }

            })

        }));
}
