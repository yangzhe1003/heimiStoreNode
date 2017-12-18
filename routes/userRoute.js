require('babel-polyfill');
let fetch = require('node-fetch');
var express = require('express');
var router = express.Router();
let userDB = require('../DB/userDB');

router.get('/getUserCode',(res,resp) => {
    console.log('用户code:',res.query.code);
    let code = res.query.code;
    fetch('https://api.weixin.qq.com/sns/jscode2session?appid=wxab529bcb173f0b46&secret=3ff03d4f4efca88708743208d21bbc2a&grant_type=authorization_code&js_code='+code)
    .then(function(res) {
        return res.json();
    }).then(function(json) {
        userDB.getUserByOpenId(json.openid).then(res => {
            console.log('查询到的值为:',res);
            if(!res.length){
                console.log('数据库没有openid',res);
                userDB.setUserOpenId(json.openid).then(res => {
                    console.log('保存openid成功',res);
                }).catch(err => {
                    console.log('保存openid失败',err);
                });
            }
        })
        console.log('微信服务器返回数据:',json);
        resp.send(json);
    });
});


module.exports = router;
