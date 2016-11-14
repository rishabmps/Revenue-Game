var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../../models/userModel');

module.exports = function() {
    passport.use(new GoogleStrategy({
            clientID: '510897002595-3elqiltjkohjfq9vli83rnrp9sgd2jcc.apps.googleusercontent.com',
            clientSecret: '0aWD1hSQYZ25iIWXcMYWiC2K',
            callbackURL: 'http://didnrsjina6.in.sas.com:3000/auth/google/callback'
        },
        function(req, accessToken, refreshToken, profile, done) {
            var query = {
                'google.id': profile.id
            };

            User.findOne(query, function(error, user) {
                if (user) {
                    console.log('found');

                    done(null, user);
                } else {
                    console.log('not found');
                    var user = new User;
                    console.log(profile._json);
                    user.email = profile.emails[0].value;
                    user.image = profile._json.image.url;
                    user.displayName = profile.displayName;

                    user.google = {};
                    user.google.id = profile.id;
                    user.google.token = accessToken;
                    user.save();
                    done(null, user);
                }
            })
        }
    ));


};
