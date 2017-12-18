let mysql = require('mysql');

let pool = global.pool;
if(!pool){
    //创建连接池
    pool = mysql.createPool({
        database: 'shopStore',
        user: 'root',
        password: 'root'
    });

    //将连接池挂载到全局
    global.pool = pool;
}

//封装获取数据库连接
getConnection = function(){
    return new Promise((resolve,reject) => {
        pool.getConnection((err, connect) => {
            if(!err){
                resolve(connect);
            }else{
                reject(err);
            }
        });
    });
}

//封装执行SQL
execute = function(sql){
    return new Promise((resolve,reject) => {
        let connection;
        getConnection().then((connect) => {
            connection = connect;
            connect.query(sql,(err,result) => {
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            });
        }).catch((err) => {
            reject(err);
        }).finally(() => {
            if(connection){
                connection.release();
            }
        });

    });
}



module.exports = {
    getConnection,
    execute
}
