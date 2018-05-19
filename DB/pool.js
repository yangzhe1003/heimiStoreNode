let mysql = require('mysql');

let pool = global.pool;
if(!pool){
    //创建连接池
    pool = mysql.createPool({
        database: 'heimiStoreDB',
        user: 'root',
        password: 'root'
    });

    //将连接池挂载到全局
    global.pool = pool;
}

//封装获取数据库连接
getConnection = function(){
    return new Promise((resolve,reject) => {
        //连接到数据库
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
        //调用连接方法
        getConnection().then((connect) => {
            connection = connect;
            connect.query(sql,(err,result) => {     //连接成功，执行sql语句

                if(!err){
                    resolve(result);  //返回查询成功结果
                }else{
                    reject(err);   //返回查询失败结果
                }
            });
        }).catch((err) => {
            reject(err);  //返回连接失败结果
        }).finally(() => {
            if(connection){
                connection.release();  //无论成功还是失败，都释放掉连接，方便下一次连接
            }
        });
    });
}



module.exports = {
    getConnection,
    execute
}
