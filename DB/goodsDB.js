require('babel-polyfill');
let pool = require('./pool');
module.exports = {
    getAllGoods(){
        let sql = "select * from goods;";
        return pool.execute(sql);
    },
    getBanners(){
        let sql = "select * from banners;";
        return pool.execute(sql);
    },
    getAllClassify(){
        let sql = "select * from classify;";
        return pool.execute(sql);
    },
    getGoodsByClassify(classify_id){
        let sql = "select id,name,small_img from goods where classify_id = '"+classify_id+"';";
        return pool.execute(sql);
    }
}
