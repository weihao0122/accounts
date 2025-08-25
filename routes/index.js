const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');
var express = require('express');
var router = express.Router();
// 指定 db.json 路径
const adapter = new FileSync(path.join(__dirname, '../data/db.json'));
const db = low(adapter);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//记账本列表
router.get('/account',(req,res)=>{
  
  //res.send('账本的列表');
  res.render('list');
});
//添加记录页面
router.get('/account/create',(req,res)=>{
  // res.send('添加记录');
  res.render('create');
});

router.post('/account', (req, res) => {
  // 生成唯一ID
  const id = shortid.generate();
  console.log(req.body); // 打印表单提交的数据
  res.send('添加记录保存');
});
module.exports = router;
