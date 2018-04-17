var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//引入session相关
var session = require('express-session');
var FileStore = require('session-file-store')(session);


//路由相关
var index = require('./routes/index');
var users = require('./routes/users');
//自定义路由
var userRoute = require('./routes/userRoute');
var goodsRoute = require('./routes/goodsRoute');
var cartRoute = require('./routes/cartRoute');
var uploadRoute = require('./routes/uploadRoute');
var appwxRoute = require('./routes/appwxRoute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//小程序客户端跳过登录验证
app.use('/appwx', appwxRoute);

//使用session
var identityKey = 'skey';
app.use(session({
	name: identityKey,
	secret: 'admin',  // 用来对session id相关的cookie进行签名
	store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
	saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
	resave: false,  // 是否每次都重新保存会话，建议false
	cookie: {
		maxAge: 1000 * 1000,  // 有效期，单位是毫秒
		httpOnly: true
	}
}));

//登录拦截器
app.all('/*', function(req, resp, next){
	if (req.session.loginUser) {
		req.session.regenerate(function(err) {
			if(err){
				return resp.json({code: 90004, message: '登录已过期，请重新登录'});				
			}else {
				next();
			}
										
		});
		
	}else {
		var arr = req.url.split('/');// 解析用户请求的路径

		for (var i = 0, length = arr.length; i < length; i++) {// 去除 GET 请求路径上携带的参数
			arr[i] = arr[i].split('?')[0];
		}
		if (arr.length > 1 && arr[1] == '') {// 判断请求路径是否为根、登录、注册、登出，如果是不做拦截
			next();
		} else if (arr.length > 2 && arr[1] == 'user' && (arr[2] == 'register' || arr[2] == 'login' || arr[2] == 'logout' || arr[2].indexOf('login') >= 0 )) {
			next();
		} else {  // 登录拦截
			// req.session.originalUrl = req.originalUrl ? req.originalUrl : null;  // 记录用户原始请求路径
			// resp.json({code: 90004, message: '未登录!'});
			next();
		}
	}
});

app.use('/', index);
app.use('/users', users);

//自定义路径
app.use('/user',userRoute);
app.use('/goods',goodsRoute);
app.use('/cart',cartRoute);
app.use('/file',uploadRoute);

//设置跨域访问
app.all('*', function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
		res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
		res.header("X-Powered-By",' 3.2.1')
		res.header("Content-Type", "application/json;charset=utf-8");
		next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
