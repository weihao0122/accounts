//配置文件 - 公开配置
module.exports = {
  // 数据库配置
  DBHOST: '127.0.0.1',
  DBPORT: 27017,
  DBNAME: 'bilibili',
  
  // JWT配置 - 从私有配置文件加载
  ...require('./config.secret.js'),
  
  // 应用配置
  NODE_ENV: 'development',
  PORT: 3000
}