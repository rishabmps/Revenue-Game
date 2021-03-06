var passport = require('passport');
var mongoose = require('mongoose')


module.exports = function(app) {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {
        done(null, user);

    });

    passport.deserializeUser(function(user, done) {
        done(null, user);

    });

    require('./strategies/google.strategy')();
    require('./strategies/twitter.strategy')();
    require('./strategies/facebook.strategy')();

};
