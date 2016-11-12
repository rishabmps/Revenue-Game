var express = require('express');
var router = express.Router();
var facebookService = require('../service/facebook')('1617228834969795', 'eaa57dfdbb3a243c83d3b1a17762cc40');
var User = require('../models/userModel');

router.use('/', function(req, res, next) {
        if (!req.user) {
            res.redirect('/');
        }
        next();
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
                    user.save();
                });
                res.render('users', {
                    user: req.user
                });

            }
        );
    } else {
        res.render('users', {
            user: req.user
        });
    }

});

module.exports = router;
