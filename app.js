var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var analytics = require('./config/properties');
/*Routes*/
var index = require('./routes/index');
var game = require('./routes/game');
var auth = require('./routes/auth');

/*Making database connection*/
var databseConnection = require('./config/databseConnection.js');
databseConnection();

var app = express();
app.use("/js", express.static("js"));
app.use("/css", express.static("css"));
app.use("/img", express.static("img"));
app.use("/less", express.static("less"));
app.use("/font-awesome", express.static("font-awesome"));
app.use("/fonts", express.static("fonts"));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'anything',
    cookie: {
        secure: false
    },
    saveUninitialized: true,
    resave: true
}));

require('./config/passport')(app);

app.use('/', index);
app.use('/game', game);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error', {
        title: 'IDeaS - Revenue Optimization Game',
        trackingId: analytics.googleAnalytics.trackingId
    });
});


module.exports = app;
