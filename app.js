const express = require('express');
const logger = require('./logger'); 
const bodyParser = require('body-parser');
const loginRoutes = require('./src/routes/login.routes');
const updateRoutes = require('./src/routes/update.routes');
const menuRoutes = require('./src/routes/menu.routes');
const userRoutes = require('./src/routes/user.routes');
const groupRoutes = require('./src/routes/group.routes');

const app = express();

// 미들웨어 설정
app.use(bodyParser.json());

// 라우트 설정
app.use('/api/login', loginRoutes); // 로그인 API 경로
app.use('/api/update', updateRoutes); // 파일 업데이트 API 경로
app.use('/api/menu', menuRoutes); // 메뉴 API 경로
app.use('/api/user', userRoutes); // 사용자 정보 경로
app.use('/api/group', groupRoutes); // 그룹 정보 경로

module.exports = app;
