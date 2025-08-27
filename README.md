# 记账本系统

一个基于Node.js和MongoDB的现代化记账本应用，采用JWT认证和现代简约UI设计。

## 功能特点

- 💰 收支记录管理
- 🔐 JWT身份认证
- 📱 响应式现代UI设计
- 🚀 前后端分离架构
- 🗄️ MongoDB数据存储

## 技术栈

- **后端**: Node.js + Express
- **数据库**: MongoDB + Mongoose
- **认证**: JWT (JSON Web Token)
- **模板引擎**: EJS
- **UI**: 纯CSS现代简约设计

## 安装运行

### 1. 克隆项目
```bash
git clone [项目地址]
cd accounts
```

### 2. 安装依赖
```bash
npm install
```

### 3. 配置数据库
确保MongoDB服务已启动，默认连接到 `mongodb://127.0.0.1:27017/bilibili`

### 4. 配置JWT密钥
```bash
# 复制配置文件
cp config/config.secret.example.js config/config.secret.js

# 编辑配置文件，修改JWT密钥
# 建议使用随机生成的强密钥
```

### 5. 启动应用
```bash
npm start
```

应用将在 `http://localhost:3000` 启动

## 项目结构

```
accounts/
├── config/
│   ├── config.js              # 公开配置
│   ├── config.secret.js       # 私有配置（不上传）
│   └── config.secret.example.js # 配置示例
├── middleware/
│   └── auth.js                # JWT认证中间件
├── models/
│   ├── AccountModel.js        # 账单模型
│   └── UserModel.js           # 用户模型
├── routes/
│   ├── api/                   # API路由（JSON）
│   └── web/                   # 页面路由（HTML）
├── views/                     # EJS模板
└── public/                    # 静态资源
```

## API接口

### 认证接口
- `POST /auth/login` - 用户登录
- `POST /auth/reg` - 用户注册
- `GET /auth/logout` - 退出登录

### 账单接口（需要认证）
- `GET /api/account/` - 获取账单列表
- `POST /api/account/` - 创建账单
- `GET /api/account/detail/:id` - 获取账单详情
- `PUT /api/account/:id` - 更新账单
- `DELETE /api/account/:id` - 删除账单

### 页面路由（需要认证）
- `GET /accounts` - 账单列表页面
- `GET /accounts/create` - 添加账单页面
- `GET /accounts/edit/:id` - 编辑账单页面
- `GET /accounts/view/:id` - 查看账单详情

## 安全说明

- JWT密钥存储在 `config/config.secret.js` 中，该文件不会上传到版本控制
- 使用HTTP-only Cookie存储JWT令牌，防止XSS攻击
- 密码使用MD5加密存储（生产环境建议使用bcrypt）

## 开发说明

1. 首次部署时需要复制 `config.secret.example.js` 为 `config.secret.js`
2. 生产环境务必更换默认的JWT密钥
3. 建议定期更换JWT密钥以提高安全性

## License

MIT 