var express = require('express');
var router = express.Router();

/* GET home page. */
//若请求是/或者/api 重定向到http://localhost:3000/api/users
router.get(/^(\/|\/api)$/, function(req, res, next) {
  // res.render('index', { title: 'Express' });
    res.cookie('name', 'Joy', {path: '/api', signed: false, maxAge: 600000});
    // res.render('register', { title: 'Express' });
    res.render('api');
});

module.exports = router;
