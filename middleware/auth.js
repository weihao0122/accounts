const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/config');

// 生成JWT Token
function generateToken(user) {
  return jwt.sign(
    { 
      id: user._id, 
      username: user.username 
    },
    JWT_SECRET,
    { 
      expiresIn: JWT_EXPIRES_IN
    }
  );
}

// 验证JWT Token
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// JWT认证中间件
function authenticateJWT(req, res, next) {
  // 从Cookie中获取token
  const token = req.cookies.token;
  
  if (!token) {
    return res.redirect('/auth/login');
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    // Token无效，清除cookie并重定向到登录页
    res.clearCookie('token');
    return res.redirect('/auth/login');
  }

  // 将用户信息添加到请求对象
  req.user = decoded;
  next();
}

// API认证中间件（返回JSON）
function authenticateJWT_API(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
  
  if (!token) {
    return res.status(401).json({
      code: 401,
      msg: '未提供认证令牌',
      data: null
    });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({
      code: 401,
      msg: '无效的认证令牌',
      data: null
    });
  }

  req.user = decoded;
  next();
}

module.exports = {
  generateToken,
  verifyToken,
  authenticateJWT,
  authenticateJWT_API
}; 