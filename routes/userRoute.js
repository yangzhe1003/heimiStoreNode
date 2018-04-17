require('babel-polyfill');
var express = require('express');
var router = express.Router();
let userDB = require('../DB/userDB');

var identityKey = 'skey';
var users = require('./usersTable').items;
//定义匹配用户函数
var findUser = function(name, password){
	return users.find(function(item){
		return item.name === name && item.password === password;
	});
};

/*********后台接口***********/

router.post('/login', function(req, resp, next){
	
	var sess = req.session;
    var user = findUser(req.body.user_name, req.body.password);
    
	if(user){
		req.session.regenerate(function(err) {
			if(err){
				return resp.json({code: 2, message: '登录失败'});				
			}
			
			req.session.loginUser = user.name;
			resp.json({code: 0, data: { user_name: user.name }, message: '登录成功'});							
		});
	}else{
		resp.json({code: 1, message: '账号或密码错误'});
	}	
});

router.get('/logout', function(req, resp, next){
	// 备注：这里用的 session-file-store 在destroy 方法里，并没有销毁cookie
	// 所以客户端的 cookie 还是存在，导致的问题 --> 退出登陆后，服务端检测到cookie
	// 然后去查找对应的 session 文件，报错
	// session-file-store 本身的bug	

	req.session.destroy(function(err) {
		if(err){
			resp.json({code: 2, message: '退出登录失败'});
			return;
		}
		
		// req.session.loginUser = null;
		resp.clearCookie(identityKey);
		resp.json({code: 0, message: '登出成功'});
	});
});

router.get('/getUserCount',(req,resp)=>{
	userDB.getUserCount().then(res => {
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
