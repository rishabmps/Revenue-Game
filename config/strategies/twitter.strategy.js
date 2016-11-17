var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../../models/userModel');
var config = require('../properties');

module.exports = function() {
    passport.use(new TwitterStrategy({
            consumerKey: config.twitterAuth.consumerKey,
            consumerSecret: config.twitterAuth.consumerSecret,
            callbackURL: config.twitterAuth.callbackURL,
            passReqToCallback: true
        },
        function(req, token, tokenSecret, profile, done) {
            var query = {
                'twitter.id': profile.id
            };

            User.findOne(query, function(error, user) {
                if (error) {
                    console.error("Error while finding the user in twitter authentification", error);
                }
                if (user) {
                    console.log('found');

                    done(null, user);
                } else {
                    console.log('not found');
                    var user = new User;
                    user.image = profile._json.profile_image_url;
                    user.displayName = profile.displayName;
                    user.id = profile.id;
                    user.source = "twitter";
                    user.twitter = {};
                    user.twitter.id = profile.id;
                    user.twitter.token = token;
                    console.log("Adding user:")
                    console.log(user);
                    user.save();
                    done(null, user);
                }
            })
        }));
}
