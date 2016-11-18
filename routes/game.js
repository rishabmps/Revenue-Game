var express = require('express');
var router = express.Router();
var config = require('../config/properties');
var facebookService = require('../service/facebook')(config.facebookAuth.clientID, config.facebookAuth.clientSecret);
var User = require('../models/userModel');

router.use('/', function(req, res, next) {

        /* To prevent cache in browsers*/
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');

        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/');
        }
    })
    /* GET users listing. */
router.get('/', function(req, res) {

    if (!req.user.image) {
        facebookService.getImageAndEmail(req.user.facebook.token,
            function(results) {

                var query = {
                    'facebook.id': req.user.facebook.id
                };

                User.findOne(query, function(error, user) {
                    user.image = results.picture.data.url;
                    user.email = results.email;
                    req.user.image = user.image;
                    req.user.email = user.email;
                    user.save();
                    console.log("Adding user image and email to database using service");
                    console.log(req.user);
                    res.render('game', {

                        user: req.user
                    });
                });

            }
        );
    } else {
        res.render('game', {
            user: req.user
        });
    }

});

module.exports = router;
