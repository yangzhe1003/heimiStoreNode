require('babel-polyfill');
let fetch = require('node-fetch');
var express = require('express');
var router = express.Router();
let goodsDB = require('../DB/goodsDB');
let cartDB = require('../DB/cartDB');
let userDB = require('../DB/userDB');

/*********前端接口***********/
router.get('/getUserCode',(res,resp) => {
    console.log('用户code:',res.query.code);
    var code = res.query.code;
    fetch('https://api.weixin.qq.com/sns/jscode2session?appid=wxab529bcb173f0b46&secret=3d66a42f8807f01f6e83224b775e2b89&grant_type=authorization_code&js_code='+code)
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
            resp.json({
                code: 0,
                data: res,
                message: 'success'
            });
        })
        console.log('微信服务器返回数据:',json);
    });
});


//商品相关接口
router.get('/getAllGoods',(res,resp) => {
    goodsDB.getAllGoods().then(res => {
        resp.json({
            code: 0,
            data: res,
            message: 'success'
        });
    }).catch(err => {
        resp.json({
            code: 1,
            message: err
        });
    });
});

router.get('/getBanners',(res,resp) => {
    goodsDB.getBanners().then(res => {
        resp.json({
            code: 0,
            data: res,
            message: 'success'
        });
    }).catch(err => {
        resp.json({
            code: 1,
            message: err
        });
    });
});

router.get('/getAllClassify',(res,resp) => {
    goodsDB.getAllClassify().then(res => {
        resp.json({
            code: 0,
            data: res,
            message: 'success'
        });
    }).catch(err => {
        resp.json({
            code: 1,
            message: err
        });
    });
});

router.get('/getGoodsByClassify',(req,resp) => {
    let classify_id = req.query.id;
    goodsDB.getGoodsByClassify(classify_id).then(res => {
        resp.json({
            code: 0,
            data: res,
            message: 'success'
        });
    }).catch(err => {
        resp.json({
            code: 1,
            message: err
        });
    });
});

router.get('/getGoodById',(req,resp) => {
    let id = req.query.id;
    goodsDB.getGoodById(id).then(res => {
        resp.json({
            code: 0,
            data: res,
            message: 'success'
        });
    }).catch(err => {
        resp.json({
            code: 1,
            message: err
        });
    });
})

//订单相关接口

router.post('/addCart',(res,resp) => {
    let good = res.body.good;
    let user = res.body.user;
    console.log(good,user);
    cartDB.addCart(good,user).then(res => {
        resp.json({
            code: 0,
            data: res,
            message: 'success'
        });
    }).catch(err => {
        resp.json({
            code: 1,
            message: err
        });
    });
});

router.get('/getCart',(res,resp) => {
    let userId = res.query.userId;
    cartDB.getCart(userId).then(res => {
        resp.json({
            code: 0,
            data: res,
            message: 'success'
        });
    }).catch(err => {
        resp.json({
            code: 1,
            message: err
        });
    });
})

router.get('/toBuy',(res,resp) => {
    let userId = res.query.userId;
    let goods = res.query.goods;
    cartDB.getCartById(userId,goods).then(res=>{
        console.log(goods);
        let totalMoney = 0;
        res.forEach((item,index)=>{
            totalMoney += item.good_price;
        });
        let update = moment().format('YYYY-MM-DD HH:mm:ss');
        cartDB.setOrder(userId,goods,totalMoney,update).then(res=>{
            console.log(res);
        }).catch(err=>{
            console.log(err);
        });
        resp.send();
    }).catch(err =>{
        console.log(err);
        resp.send();
    });
});

router.get('/getOrderByUserId',(res,resp)=>{
    let userId = res.query.userId;
    cartDB.getOrderByUserId(userId).then(res=>{
        resp.json({
            code: 0,
            data: res,
            message: 'success'
        });
    }).catch(err=>{
        resp.json({
            code: 1,
            message: err
        });
    });
});

router.get('/getAllOrder',(req,resp)=>{

    cartDB.getAllOrder().then(res=>{
        resp.json({
            code: 0,
            data: res,
            message: 'success'
        });
    }).catch(err=>{
        resp.json({
            code: 1,
            message: err
        });
    });
});

router.get('/getGoodsByOrder',(res,resp) => {
    let goods = res.query.goods;
    cartDB.getGoodsByOrder(goods).then(res=>{
        resp.json({
            code: 0,
            data: res,
            message: 'success'
        });
    }).catch(err=>{
        resp.json({
            code: 1,
            message: err
        });
    });
});

module.exports = router;
