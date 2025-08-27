# 账单管理 API 文档

## 响应格式

所有API接口统一采用以下响应格式：

```json
{
  "code": 0,        // 业务编号，0表示成功，非零表示失败
  "msg": "操作成功", // 响应提示信息
  "data": {}        // 实际返回的数据内容
}
```

## API 接口

### 1. 获取账单列表

- **URL**: `GET /api/account`
- **成功响应**:

```json
{
  "code": 0,
  "msg": "读取成功",
  "data": [
    {
      "_id": "账单ID",
      "title": "账单标题", 
      "account": 100,
      "type": -1,
      "time": "2023-12-01T00:00:00.000Z",
      "remarks": "备注信息"
    }
  ]
}
```

- **失败响应**:

```json
{
  "code": 1001,
  "msg": "读取失败",
  "data": null
}
```

### 2. 创建账单

- **URL**: `POST /api/account`
- **请求体**:

```json
{
  "title": "账单标题",
  "account": 100,
  "type": -1,
  "time": "2023-12-01",
  "remarks": "备注信息"
}
```

- **成功响应**:

```json
{
  "code": 0,
  "msg": "添加成功",
  "data": {
    "_id": "新创建的账单ID",
    "title": "账单标题",
    "account": 100,
    "type": -1,
    "time": "2023-12-01T00:00:00.000Z",
    "remarks": "备注信息"
  }
}
```

- **失败响应**:

```json
{
  "code": 1002,
  "msg": "插入失败",
  "data": null
}
```

### 3. 删除账单

- **URL**: `DELETE /api/account/:id`
- **成功响应**:

```json
{
  "code": 0,
  "msg": "删除成功",
  "data": {
    "acknowledged": true,
    "deletedCount": 1
  }
}
```

- **失败响应**:

```json
{
  "code": 1003,
  "msg": "删除失败",
  "data": null
}
```

### 3. 获取单个账单

- **URL**: `GET /api/account/detail/:id`
- **成功响应**:

```json
{
  "code": 0,
  "msg": "获取成功",
  "data": {
    "_id": "账单ID",
    "title": "账单标题",
    "account": 100,
    "type": -1,
    "time": "2023-12-01T00:00:00.000Z",
    "remarks": "备注信息"
  }
}
```

- **失败响应**:

```json
{
  "code": 1004,
  "msg": "获取账单详情失败",
  "data": null
}
```

或

```json
{
  "code": 1005,
  "msg": "账单不存在",
  "data": null
}
```

### 4. 更新账单

- **URL**: `PUT /api/account/:id`
- **请求体**:

```json
{
  "title": "更新后的账单标题",
  "account": 150,
  "type": 1,
  "time": "2023-12-02",
  "remarks": "更新后的备注信息"
}
```

- **成功响应**:

```json
{
  "code": 0,
  "msg": "更新成功",
  "data": {
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
  }
}
```

- **失败响应**:

```json
{
  "code": 1006,
  "msg": "更新失败",
  "data": null
}
```

或

```json
{
  "code": 1005,
  "msg": "账单不存在",
  "data": null
}
```

### 5. 删除账单

## 页面路由

### 1. 账单列表页面

- **URL**: `GET /api/account/list`
- **说明**: 渲染账单列表页面

### 2. 添加账单页面  

- **URL**: `GET /api/account/create`
- **说明**: 渲染添加账单表单页面

### 3. 编辑账单页面

- **URL**: `GET /api/account/edit/:id`
- **说明**: 渲染编辑账单表单页面，预填充现有数据

### 4. 查看账单详情页面

- **URL**: `GET /api/account/view/:id`
- **说明**: 渲染账单详情查看页面，显示完整的账单信息

### 5. 更新账单（页面功能）

- **URL**: `POST /api/account/edit/:id`
- **说明**: 更新账单并跳转到成功页面

### 6. 删除账单（页面功能）

- **URL**: `GET /api/account/:id`
- **说明**: 删除账单并跳转到成功页面

## 业务编码说明

- `0`: 操作成功
- `1001`: 读取失败
- `1002`: 插入失败  
- `1003`: 删除失败
- `1004`: 获取账单详情失败
- `1005`: 账单不存在
- `1006`: 更新失败
