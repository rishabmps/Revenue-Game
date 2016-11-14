var express = require('express');
var router = express.Router();
var facebookService = require('../service/facebook')('1617228834969795', 'eaa57dfdbb3a243c83d3b1a17762cc40');
var User = require('../models/userModel');

router.use('/', function(req, res, next) {
        if (!req.user) {
            res.redirect('/');
        }
        else{
            next();
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
