var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../../models/userModel');
var config = require('../properties');
module.exports = function() {
    passport.use(new GoogleStrategy({
            clientID: config.googleAuth.clientID,
            clientSecret: config.googleAuth.clientSecret,
            callbackURL: config.googleAuth.callbackURL
        },
        function(req, accessToken, refreshToken, profile, done) {
            var query = {
                'google.id': profile.id
            };

            User.findOne(query, function(error, user) {

                if (error) {
                    console.error("Error while finding the user in google authentification", error);
                }

                if (user) {
                    console.log('found');

                    done(null, user);
                } else {
                    console.log('not found');
                    var user = new User;
                    user.email = profile.emails[0].value;
                    user.image = profile._json.image.url;
                    user.displayName = profile.displayName;
                    user.id = profile.id;
                    user.source = "google";
                    user.google = {};
                    user.google.id = profile.id;
                    user.google.token = accessToken;
                    console.log("Adding user:")
                    console.log(user);
                    user.save();
                    done(null, user);
                }
            })
        }
    ));


};
