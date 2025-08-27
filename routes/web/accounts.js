var express = require('express');
var router = express.Router();
const moment = require('moment');
const AccountModel = require('../../models/AccountModel');
const { authenticateJWT } = require('../../middleware/auth');

// 账本列表页面
router.get('/', authenticateJWT, function(req, res, next) {
  AccountModel.find().sort({time: -1}).exec((err, data) => {
    if(err){
      res.status(500).send('读取失败~~~');
      return;
    }
    res.render('list', {accounts: data, moment: moment});
  })
});

// 添加记录页面
router.get('/create', authenticateJWT, function(req, res, next) {
  res.render('create');
});

// 编辑账单页面
router.get('/edit/:id', authenticateJWT, function(req, res, next) {
  let id = req.params.id;
  AccountModel.findById(id, (err, data) => {
    if(err || !data) {
      res.status(500).send('获取账单信息失败');
      return;
    }
    res.render('edit', {account: data, moment: moment});
  });
});

// 查看账单详情页面
router.get('/view/:id', authenticateJWT, function(req, res, next) {
  let id = req.params.id;
  AccountModel.findById(id, (err, data) => {
    if(err || !data) {
      res.status(500).send('获取账单信息失败');
      return;
    }
    res.render('detail', {account: data, moment: moment});
  });
});

// 更新账单 - 页面功能 (POST方式)
router.post('/edit/:id', authenticateJWT, (req, res) => {
  let id = req.params.id;
  AccountModel.updateOne({_id: id}, {
    ...req.body,
    time: moment(req.body.time).toDate()
  }, (err, data) => {
    if(err) {
      res.status(500).send('更新失败~');
      return;
    }
    if(data.matchedCount === 0) {
      res.status(404).send('账单不存在');
      return;
    }
    res.render('success', {msg: '更新成功~~~', url: '/accounts'});
  });
});

// 新增记录 - 页面功能 (POST方式)
router.post('/create', authenticateJWT, (req, res) => {
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate()
  }, (err, data) => {
    if(err){
      res.status(500).send('插入失败~~');
      return;
    }
    res.render('success', {msg: '添加成功哦~~~', url: '/accounts'});
  })
});

// 删除记录 - 页面功能 (GET方式)
router.get('/delete/:id', authenticateJWT, (req, res) => {
  let id = req.params.id;
  AccountModel.deleteOne({_id: id}, (err, data) => {
    if(err) {
      res.status(500).send('删除失败~');
      return;
    }
    res.render('success', {msg: '删除成功~~~', url: '/accounts'});
  })
});

module.exports = router; 