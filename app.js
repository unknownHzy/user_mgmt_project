const easyMonitor = require('easy-monitor');
easyMonitor('user-mgmt-project');
const fundebug = require('fundebug-nodejs');
fundebug.apikey = '575fd33116885e7df3f8e7c0f1a9a13958eb7eb9c03cc26dafea4078248a01fd';
var express = require('express');
var methodOverride = require('method-override');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const Promise = require('bluebird');
global.Promise = Promise;

var index = require('./routes/index');
var api = require('./routes/api/index.js');

var app = express();

// app.use(fundebug.ExpressErrorHandler);
fundebug.notify('Test', 'Hello, Fundebug');
// override with POST having ?_method=DELETE
/*
 *req.method will be set to this value, as if it has originally been that value.
 *The previous req.method value will be stored in req.originalMethod.
*/
app.use(methodOverride('_method', {methods: ['POST', 'GET']}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));// application/x-www-form-urlencoded是指表单的提交，并且将提交的数据进行urlencode
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// add baseurl 路由到指定的router
// app.use('/api', index);
app.use(index);
app.use('/api', api);//only request to /api/user/* will be sent to users router

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
  res.render('error');
});

module.exports = app;
