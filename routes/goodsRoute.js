require('babel-polyfill');
var express = require('express');
var router = express.Router();
let goodsDB = require('../DB/goodsDB');

router.get('/getAllGoods',(res,resp) => {
    goodsDB.getAllGoods().then(res => {
        console.log('查询所有商品信息:',res);
        resp.send(res);
    }).catch(err => {
        console.log('查询失败',err);
        resp.send(err);
    });
});

router.get('/getBanners',(res,resp) => {
    goodsDB.getBanners().then(res => {
        resp.send(res);
    }).catch(err => {
        resp.send(err);
    });
});

router.get('/getAllClassify',(res,resp) => {
    goodsDB.getAllClassify().then(res => {
        resp.send(res);
    }).catch(err => {
        resp.send(err);
    });
});

router.get('/getGoodsByClassify',(res,resp) => {
    let classify_id = res.query.id;
    goodsDB.getGoodsByClassify(classify_id).then(res => {
        resp.send(res);
    }).catch(err => {
        resp.send(err);
    });
});


module.exports = router;
