require('babel-polyfill');
var express = require('express');
var router = express.Router();
let goodsDB = require('../DB/goodsDB');

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


//后台修改商品接口
router.post('/editGood',(req,resp) => {
    const { id, classify_id, small_img, name, detail, model, price, img_url1, img_url2, img_url3, detail_url1, detail_url2, detail_url3 } = req.body;
    goodsDB.editGood(id, name, classify_id, price, model, detail, small_img, img_url1, img_url2, img_url3, detail_url1, detail_url2, detail_url3).then(res=>{
        resp.json({
            code: 0,
            data: res,
            message: 'success'
        });
    }).catch(err=>{
        console.log(err);
        resp.json({
            code: 1,
            message: '接口请求失败'
        });
    });
})


//后台编辑类别接口
router.get('/editClassify',(req,resp) => {
    const { id, name } = req.query;
    if(!name){
        resp.json({
            code: 1,
            message: '类别名称不能为空'
        });
    }else {
        goodsDB.editClassify(id,name).then(res => {
            resp.json({
                code: 0,
                message: 'success'
            });
        }).catch(err => {
            resp.json({
                code: 2,
                message: err
            });
        });
    }
});

//类别上下架
router.get('/upOrDown',(req,resp) => {
    const { type, id, status } = req.query;
    if(!type){
        resp.json({
            code: 1,
            message: 'type不能为空'
        });
    }else if(!id){
        resp.json({
            code: 1,
            message: 'id不能为空'
        });
    }else if(!status){
        resp.json({
            code: 1,
            message: 'status不能为空'
        });
    }else {
        goodsDB.upOrDown(type,id,status).then(res => {
            resp.json({
                code: 0,
                message: 'success'
            });
        }).catch(err => {
            resp.json({
                code: 2,
                message: err
            });
        });
    }
});

//后台通过id获取Banenr
router.get('/getBannerById',(req,resp) => {
    const { id } = req.query;
    if(id){
        goodsDB.getBannerById(id).then(res => {
            resp.json({
                code: 0,
                data: res,
                message: 'success'
            });
        }).catch(err => {
            resp.json({
                code: 2,
                message: err
            });
        });
    }else {
        resp.json({
            code: 1,
            message: 'BanenrId不能为空'
        });
    }
});

//后台编辑banner接口
router.post('/editBanner',(req,resp) => {
    const { id, img_url, good_id } = req.body;
    goodsDB.editBanner(id, img_url, good_id).then(res => {
        resp.json({
            code: 0,
            data: res,
            message: 'success'
        });
    }).catch(err => {
        resp.json({
            code: 2,
            message: err
        });
    });
});

router.get('/getGoodsCount',(req,resp)=>{
    goodsDB.getGoodsCount().then(res => {
        resp.json({
            code: 0,
            data: res,
            message: 'success'
        });
    }).catch(err => {
        resp.json({
            code: 2,
            message: err
        });
    });
});


module.exports = router;
