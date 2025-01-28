const express = require('express');
const logger = require('./logger'); 
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/user.routes');
const postRoutes = require('./src/routes/post.routes');
const loginRoutes = require('./src/routes/login.routes');
const updateRoutes = require('./src/routes/update.routes');

const app = express();

// 미들웨어 설정
app.use(bodyParser.json());

// 라우트 설정
app.use('/api/users', userRoutes); // 사용자 API 경로
app.use('/api/posts', postRoutes); // 게시물 API 경로
app.use('/api/login', loginRoutes); // 로그인 API 경로
app.use('/api/update', updateRoutes); // 파일 업데이트 API 경로

module.exports = app;
