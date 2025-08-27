var express = require('express');
var router = express.Router();
//导入 用户的模型
const UserModel = require('../../models/UserModel');
const md5 = require('md5');
const { generateToken } = require('../../middleware/auth');

//注册页面
router.get('/reg', (req, res) => {
  //响应 HTML 内容
  res.render('auth/reg');
});

//注册用户
router.post('/reg', (req, res) => {
  //做表单验证
  //获取请求体的数据
  UserModel.create({...req.body, password: md5(req.body.password)}, (err, data) => {
    if(err){
      res.status(500).send('注册失败, 请稍后再试~~');
      return
    }
    res.render('success', {msg: '注册成功', url: '/auth/login'});
  })
  
});

//登录页面
router.get('/login', (req, res) => {
  //响应 HTML 内容
  res.render('auth/login');
});

//登录操作
router.post('/login', (req, res) => {
  //获取用户名和密码
  let {username, password} = req.body;
  //查询数据库
  UserModel.findOne({username: username, password: md5(password)}, (err, data) => {
    //判断
    if(err){
      res.status(500).send('登录失败, 请稍后再试~~');
      return
    }
    //判断 data
    if(!data){
      return res.send('账号或密码错误~~');
    }
    
    // 生成JWT token
    const token = generateToken(data);
    
    // 设置HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // 开发环境设为false，生产环境应设为true
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7天
      sameSite: 'lax'
    });

    //登录成功响应
    res.render('success', {msg: '登录成功', url: '/'});
  })

});

//退出登录
router.get('/logout', (req, res) => {
  // 清除JWT cookie
  res.clearCookie('token');
  res.render('success', {msg: '退出成功', url: '/auth/login'});
});

module.exports = router;
