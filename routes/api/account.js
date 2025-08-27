var express = require('express');
var router = express.Router();

// 保留 Mongoose 和 moment
const moment = require('moment');
const AccountModel = require('../../models/AccountModel');

// 账本列表 - JSON API格式
router.get('/', function(req, res, next) {
  AccountModel.find().sort({time: -1}).exec((err, data) => {
    if(err){
      res.json({
        code: 1001,
        msg: '读取失败',
        data: null
      });
      return;
    }
    res.json({
      code: 0,
      msg: '读取成功',
      data: data
    });
  })
});

// 新增记录 - JSON API格式
router.post('/', (req, res) => {
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate()
  }, (err, data) => {
    if(err){
      res.json({
        code: 1002,
        msg: '插入失败',
        data: null
      });
      return
    }
    
    // API请求返回JSON
    res.json({
      code: 0,
      msg: '添加成功',
      data: data
    });
  })
});

// 获取单个账单 - JSON API格式
router.get('/detail/:id', (req, res) => {
  let id = req.params.id;
  AccountModel.findById(id, (err, data) => {
    if(err) {
      res.json({
        code: 1004,
        msg: '获取账单详情失败',
        data: null
      });
      return;
    }
    if(!data) {
      res.json({
        code: 1005,
        msg: '账单不存在',
        data: null
      });
      return;
    }
    res.json({
      code: 0,
      msg: '获取成功',
      data: data
    });
  });
});

// 更新账单 - JSON API格式
router.put('/:id', (req, res) => {
  let id = req.params.id;
  AccountModel.updateOne({_id: id}, {
    ...req.body,
    time: moment(req.body.time).toDate()
  }, (err, data) => {
    if(err) {
      res.json({
        code: 1006,
        msg: '更新失败',
        data: null
      });
      return;
    }
    if(data.matchedCount === 0) {
      res.json({
        code: 1005,
        msg: '账单不存在',
        data: null
      });
      return;
    }
    res.json({
      code: 0,
      msg: '更新成功',
      data: data
    });
  });
});

// 删除记录 - JSON API格式
router.delete('/:id', (req, res) => {
  let id = req.params.id;
  AccountModel.deleteOne({_id: id}, (err, data) => {
    if(err) {
      res.json({
        code: 1003,
        msg: '删除失败',
        data: null
      });
      return;
    }
    res.json({
      code: 0,
      msg: '删除成功',
      data: data
    });
  })
});

module.exports = router;