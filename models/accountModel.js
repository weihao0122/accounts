const mongoose = require('mongoose');

// 定义 Schema
const accountSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true  // 标题必填
  },
  time: {
    type: Date,     // 时间，日期类型
    required: true
  },
  type: {
    type: Number,   // 类型：1 收入，-1 支出
    default: -1
  },
  account: {
    type: Number,   // 金额
    required: true
  },
  remarks: {
    type: String    // 备注，可选
  }
});

// 创建模型对象
const AccountModel = mongoose.model('account', accountSchema);

module.exports = AccountModel;
