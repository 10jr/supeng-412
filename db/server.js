/*
 * 作者: 苏鹏
 * 功能: Express 数据服务器，提供 /api/poems 接口 + 托管静态文件
 * 端口: 3004
 * 启动: node server.js
 */

// 苏鹏：引入 Express 框架、路径处理、文件系统模块
const express = require('express');
const path = require('path');
const fs = require('fs');

const SP_app = express();
const SP_PORT = 3004;

// 苏鹏：允许跨域访问（让用户即使双击 file:// 打开 poems.html 也能调到接口）
SP_app.use((SP_req, SP_res, SP_next) => {
  SP_res.setHeader('Access-Control-Allow-Origin', '*');
  SP_res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  SP_res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (SP_req.method === 'OPTIONS') {
    SP_res.sendStatus(200);
    return;
  }
  SP_next();
});

// 苏鹏：把项目根目录（db 的上一级）设为静态资源目录，HTML/CSS/图片可直接访问
SP_app.use(express.static(path.join(__dirname, '..')));

/**
 * 苏鹏：接口 GET /api/poems
 * 读取同目录下的 db.json，把 poems 数组以 JSON 形式返回给前端
 */
SP_app.get('/api/poems', (SP_req, SP_res) => {
  const SP_dbPath = path.join(__dirname, 'db.json');
  fs.readFile(SP_dbPath, 'utf8', (SP_err, SP_data) => {
    if (SP_err) {
      console.error('苏鹏：读取 db.json 失败', SP_err);
      SP_res.status(500).json({ error: '读取 db.json 失败' });
      return;
    }
    try {
      const SP_db = JSON.parse(SP_data);
      SP_res.json(SP_db.poems);
    } catch (SP_parseErr) {
      SP_res.status(500).json({ error: 'db.json 格式错误' });
    }
  });
});

// 苏鹏：启动服务器，监听 3004 端口
SP_app.listen(SP_PORT, () => {
  console.log('===========================================');
  console.log('苏鹏的数据服务器已启动');
  console.log(`接口地址: http://localhost:${SP_PORT}/api/poems`);
  console.log(`页面地址: http://localhost:${SP_PORT}/poems.html`);
  console.log('===========================================');
});
