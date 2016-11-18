var express = require('express');
var router = express.Router();
var analytics = require('../config/properties');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'IDeaS - Revenue Optimization Game',
        trackingId : analytics.googleAnalytics.trackingId
    });
});

router.get('/logout/', function(req, res) {
    console.log('logging out');
    req.logout();
    res.redirect('/');
});
module.exports = router;
