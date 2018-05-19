require('babel-polyfill');
var express = require('express');
var router = express.Router();
let cartDB = require('../DB/cartDB');

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

router.get('/getOrderCount',(req,resp) => {
    cartDB.getOrderCount().then( res => {
        resp.json({
            code: 0,
            data: res,
            message: 'success'
        })
    } ).catch(err=>{
        resp.json({
            code: 1,
            message: err
        });
    });
});



module.exports = router;
