require('babel-polyfill');
let pool = require('./pool');
module.exports = {
    //获取所有商品列表
    getAllGoods(){
        let sql = "select * from goods order by id desc;";
        return pool.execute(sql);
    },
    //获取banner
    getBanners(){
        let sql = "select * from banners order by id desc;";
        return pool.execute(sql);
    },
    //获取banner
    getBannerById(id){
        let sql = `select * from banners where id = ${id};`;
        return pool.execute(sql);
    },
    //获取所有分类
    getAllClassify(){
        let sql = "select * from classify;";
        return pool.execute(sql);
    },

    //后台修改商品
    editGood(id, name, classify_id, price, model, detail, small_img, img_url1, img_url2, img_url3, detail_url1, detail_url2, detail_url3){
        let sql = '';
        if(!id){
            sql = `insert into goods (name,detail,model,small_img,img_url1,img_url2,img_url3,price,detail_url1,detail_url2,detail_url3) values ( "${name}", "${detail}", "${model}", "${small_img}", "${img_url1}", "${img_url2}", "${img_url3}", ${price}, "${detail_url1}", "${detail_url2}", "${detail_url3}");`;

        }else {
            sql = `UPDATE goods SET name="${name}", detail="${detail}", model="${model}", small_img="${small_img}", img_url1="${img_url1}", img_url2="${img_url2}", img_url3="${img_url3}", price=${price}, detail_url1="${detail_url1}", detail_url2="${detail_url2}", detail_url3="${detail_url3}" WHERE id=${id};`;
        }
        return pool.execute(sql);
    },

    //后台修改banner
    editBanner(id, img_url, good_id){
        let sql = '';
        if(!id){
            sql = `INSERT INTO banners (img_url,good_id) VALUES ('${img_url}',${good_id});`
        }else {
            sql = `UPDATE banners SET img_url='${img_url}', good_id = '${good_id}' WHERE id='${id}';`
        }
        return pool.execute(sql);
    },

    //增加或修改分类
    editClassify(id,name){
        let sql = '';
        if(id){
            sql = `UPDATE classify SET name='${name}' WHERE id='${id}';`;
        }else{
            sql = `INSERT INTO classify (name) VALUES ('${name}');`;
        }
        return pool.execute(sql);
    },
    //根据分类获取商品
    getGoodsByClassify(classify_id){
        let sql = `select id,name,small_img from goods where classify_id = ${classify_id};`;
        return pool.execute(sql);
    },
    //根据商品id查找商品
    getGoodById(id){
        let sql = "select * from goods where id = '"+id+"';";
        return pool.execute(sql);
    },

    //上下架
    upOrDown(type,id,status){
        let sql = '';
        if(type === 'goods'){
            sql = `UPDATE goods SET status='${status}' WHERE id='${id}';`;
        }else if(type === 'classify'){
            sql = `UPDATE classify SET status='${status}' WHERE id='${id}';`;
        }else if(type === 'banner'){
            sql = `UPDATE banners SET status='${status}' WHERE id='${id}';`;
        }
        return pool.execute(sql);
    },
    //查询总商品数量
    getGoodsCount(){
        let sql = "select count(*) count from goods;";
        return pool.execute(sql);
    }
}
