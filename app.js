var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var MongoStore = require('connect-mongo');

var app = express();

// 数据库连接
require('./db/db')(() => {
  console.log('数据库连接成功~~~');
}, () => {
  console.log('数据库连接失败~~~');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 中间件配置 - 必须在路由之前
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session 配置
app.use(session({
  name: 'sid', //设置cookie的name，默认值是：connect.sid
  secret: 'hong', //参与加密的字符串（又称签名）
  saveUninitialized: false, //是否为每次请求都设置一个cookie用来存储session的id
  resave: true, //是否在每次请求时重新保存session
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/bilibili' //数据库的连接配置
  }),
  cookie: {
    httpOnly: true, // 开启后前端无法通过 JS 操作
    maxAge: 1000 * 60 * 60 * 24 * 7 // 这一条 是控制 sessionID 的过期时间的！！！
  },
}));

// 路由配置 - 在中间件之后

// API 路由 (仅返回JSON数据)
const accountApiRouter = require('./routes/api/account');
app.use('/api/account', accountApiRouter);

// 前端页面路由
const indexRouter = require('./routes/web/index');
const accountsRouter = require('./routes/web/accounts');
app.use('/', indexRouter);
app.use('/accounts', accountsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;