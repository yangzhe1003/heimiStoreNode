require('babel-polyfill');
var express = require('express');
var router = express.Router();
var upload = require('./fileupload');

//文件上传服务
router.post('/upload', upload.single('file'), function (req, resp, next) {
    if (req.file) {
        resp.json({
            code: 0,
            data: req.file.filename,
            message: 'success'
        });
    }else {
        resp.json({
            code: 1,
            message: '图片上传失败'
        });
    }
});

module.exports = router;