const express = require('express');
const logger = require('./logger'); 
const bodyParser = require('body-parser');
const loginRoutes = require('./src/routes/login.routes');
const updateRoutes = require('./src/routes/update.routes');
const menuRoutes = require('./src/routes/menu.routes');
const userRoutes = require('./src/routes/user.routes');
const groupRoutes = require('./src/routes/group.routes');
const fileRoutes = require('./src/routes/file.routes');
const exchangeRoutes = require('./src/routes/exchange.routes');
const saleRoutes = require('./src/routes/sale.routes');
const saleledgerRoutes = require('./src/routes/saleledger.routes');

const app = express();

// 미들웨어 설정
app.use(bodyParser.json());

// 라우트 설정
app.use('/api/login', loginRoutes); // 로그인 API 경로
app.use('/api/update', updateRoutes); // 파일 업데이트 API 경로
app.use('/api/menu', menuRoutes); // 메뉴 API 경로
app.use('/api/user', userRoutes); // 사용자 정보 경로
app.use('/api/group', groupRoutes); // 그룹 정보 경로
app.use('/api/file', fileRoutes); // 소스 파일 정보 경로
app.use('/api/exchange', exchangeRoutes); // 소스 파일 정보 경로
app.use('/api/sale', saleRoutes); // 판매량 정보 경로
app.use('/api/saleledger', saleledgerRoutes); // 판매 내역 정보 경로

module.exports = app;
