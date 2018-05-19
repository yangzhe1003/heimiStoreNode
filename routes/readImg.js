var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');


router.get('/:filename', function (req, res) {
    var filePath = path.join('uploads', req.params.filename);
    fs.exists(filePath, function () {
        res.sendfile(filePath);
    });
});

module.exports = router;