// 导入 lowdb
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

// 创建数据存储适配器（存储在 db.json 文件中）
const adapter = new FileSync('db.json');
const db = low(adapter);

// 1. 初始化数据
db.defaults({ posts: [], user: {} }).write();

// 2. 插入数据
db.get('posts')
  .push({ id: 1, title: '新闻：今天这个天气还不错' })
  .write();

db.get('posts')
  .push({ id: 2, title: '新闻：明天可能下雨' })
  .write();

// 3. 在数组前面插入数据
db.get('posts')
  .unshift({ id: 3, title: '突发：早高峰拥堵' })
  .write();

// 4. 获取所有数据
console.log(db.get('posts').value());

// 5. 获取单条数据
const post = db.get('posts').find({ id: 1 }).value();
console.log('单条数据:', post);

// 6. 更新数据
db.get('posts')
  .find({ id: 1 })
  .assign({ title: '新闻：今天下雨了' })
  .write();

// 7. 删除数据
const removed = db.get('posts')
  .remove({ id: 2 })
  .write();
console.log('被删除的数据:', removed);