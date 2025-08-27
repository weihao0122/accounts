var express = require('express');
var router = express.Router();
const authRouter = require('./auth');
const { verifyToken } = require('../../middleware/auth');

/* GET home page - 重定向到账单列表 */
router.get('/', function(req, res, next) {
  // 检查用户是否登录（通过JWT）
  const token = req.cookies.token;
  const decoded = verifyToken(token);
  
  if(!decoded){
    return res.redirect('/auth/login');
  }
  
  // 已登录用户重定向到账单列表
  res.redirect('/accounts');
});

router.use('/auth', authRouter);

module.exports = router;