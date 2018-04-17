require('babel-polyfill');
let pool = require('./pool');
module.exports = {
    setUserOpenId(openid){
        let sql = "insert into user(openid) values('" + openid + "');";
        console.log('sql:',sql);
        return pool.execute(sql);
    },
    getUserByOpenId(openid){
        let sql = "select * from user where openid = '" + openid + "';";
        console.log('sql:',sql);
        return pool.execute(sql);
    },

    //获取用户数量
    getUserCount(){
        let sql = "select count(*) count from user;";
        return pool.execute(sql);
    }


}
