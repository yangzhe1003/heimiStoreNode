require('babel-polyfill');
let pool = require('./pool');
module.exports = {
    addCart(good,user){
        let goodId = good.id;
        let model = good.model;
        let price = good.price;
        let userId = user.id;
        let img = good.small_img;
        let status = 0;
        let isSelect = 0;
        let sql = "insert into cart (good_id, good_model, good_price, user_id, status, img, isSelect) values ('"+goodId+"', '"+model+"', '"+price+"', '"+userId+"', '"+status+"', '"+img+"', '"+isSelect+"');";
        console.log(sql);
        return pool.execute(sql);
    },
    getCart(userId){
        let sql = "select * from cart where user_id = '"+userId+"' and status = '0';";
        return pool.execute(sql);
    },
    getCartById(userId,goods){
        let sql = "select * from cart where user_id = '"+userId+"' and good_id in ("+goods+") and status = '0';";
        return pool.execute(sql);
    },
    setOrder(userId,goods,totalMoney,update){
        let sql = "INSERT INTO orders ( user_id, goods_id, totalMoney, update, status) VALUES ('"+userId+"', '"+goods+"', '"+totalMoney+"', '"+update+"', '0');";
        return pool.execute(sql);
    },
    getAllOrder(){
        let sql = "select * from orders order by id desc;";
        return pool.execute(sql);
    },
    getOrderByUserId(userId){
        let sql = "SELECT * FROM orders where user_id = '"+userId+"';";
        return pool.execute(sql);
    },
    getGoodsByOrder(goods){
        let sql = "SELECT * FROM goods where id in ("+goods+");";
        return pool.execute(sql);
    },
    //获取订单数量
    getOrderCount(){
        let sql = "select count(*) count from orders;";
        return pool.execute(sql);
    }
}
