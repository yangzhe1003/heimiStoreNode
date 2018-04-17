var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req);
  res.render('index', { title: 'Welcome to use of express!!' });
});

router.get('/:filename', function (req, res) {
    var filePath = path.join('uploads', req.params.filename);
    fs.exists(filePath, function () {
        res.sendfile(filePath);
    });
});


module.exports = router;
