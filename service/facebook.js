var OAuth = require('OAuth').OAuth2;

var facebook = function  (facebookKey,facebookSecret) {
	var key = facebookKey;
	var secret = facebookSecret;

	var oauth = new OAuth(
		key, secret, 'https://graph.facebook.com',
		null,
		'oauth2/token',
		null
	);

	var getImageAndEmail = function  (userKey, done) {
		oauth.get('https://graph.facebook.com/v2.3/me?fields=email,picture&redirect=false',
			userKey,
			function  (err,results,res) {
				if (err) console.error('error: ' + err);
				console.log(results);
				results = JSON.parse(results);

				done(results);
			}
		);
	}


	return{
		getImageAndEmail: getImageAndEmail,

	}
}

module.exports = facebook;
