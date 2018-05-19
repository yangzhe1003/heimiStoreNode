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
var readImgRoute = require('./routes/readImg');

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


//使用session
var identityKey = 'token';
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



//后台登录拦截器
app.all('/*', function(req, resp, next){
	if (req.session.loginUser) {  //判断session是否签名
		next();
	}else {
		var router = req.url.split('/');// 解析用户请求的路径
		//去除get请求路径上携带的参数
		for (var i = 0, length = router.length; i < length; i++) {
            router[i] = router[i].split('?')[0];
		}
		//设置拦截白名单，小程序、图片资源、根不拦截
		if (router.length > 1 && (router[1] === '' || router[1] === 'appwx' || router[1] === 'img')) {
			next();
		//登录、注册、登出不拦截
		} else if (router.length > 2 && router[1] === 'user' && (router[2] === 'login' || router[2] === 'logout' || router[2].indexOf('login') >= 0 )) {
			next();
		//未登录进行登录拦截
		} else {
			resp.json({code: 90004, message: '未登录!'});
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
app.use('/appwx', appwxRoute);
app.use('/img', readImgRoute);



//设置跨域访问
// app.all('*', function(req, res, next) {
// 		res.header("Access-Control-Allow-Origin", "*");
// 		res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
// 		res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
// 		res.header("X-Powered-By",' 3.2.1')
// 		res.header("Content-Type", "application/json;charset=utf-8");
// 		next();
// });

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
