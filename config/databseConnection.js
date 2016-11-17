module.exports = function () {
  var config = require('./properties');
  var mongoose = require('mongoose')
  var connectWithRetry = function() {
      return mongoose.connect(config.databaseSettings.url, function(err) {
          if (err) {
              console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
              setTimeout(connectWithRetry, 5000);
          }
      });
  };
  connectWithRetry();

  mongoose.connection.on('open', function(ref) {
      connected = true;
      console.log('open connection to mongo server.');
  });

  mongoose.connection.on('connected', function(ref) {
      connected = true;
      console.log('connected to mongo server.');
  });

  mongoose.connection.on('disconnected', function(ref) {
      connected = false;
      console.log('disconnected from mongo server.');
  });

  mongoose.connection.on('close', function(ref) {
      connected = false;
      console.log('close connection to mongo server');
  });

  mongoose.connection.db.on('reconnect', function(ref) {
      connected = true;
      console.log('reconnect to mongo server.');
  });

  mongoose.connection.on('error', function(err) {
      console.log("Mongoose error event:");
      console.log(err);
      connectWithRetry();
  });

}
