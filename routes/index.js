var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
    res.cookie('name', 'Joy', {path: '/api', signed: false, maxAge: 600000});
    // res.render('register', { title: 'Express' });
    res.redirect('/api/users');
});

module.exports = router;
