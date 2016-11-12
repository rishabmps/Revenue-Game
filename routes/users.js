var express = require('express');
var router = express.Router();
var facebookService = require('../service/facebook')('1617228834969795','eaa57dfdbb3a243c83d3b1a17762cc40');


router.use('/',function(req,res,next){
	if(!req.user){
		res.redirect('/');
	}
	next();
})
/* GET users listing. */
router.get('/', function(req, res) {
  if(req.user.facebook){
	facebook.getImage(req.user.facebook.token,
		function  (results) {
			req.users.facebook.image = results.url;
		res.render('users',{user:req.user})
		})
  }else{

  }
  res.render('users',{user: {name: req.user.displayName,
  							image: req.user.image}});
});

module.exports = router;
