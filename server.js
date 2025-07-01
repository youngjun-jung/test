const express = require('express');
const app = require('./app');
const logger = require('./logger'); 
const cors = require('cors');

// CORS 설정 (예: Vue가 8081 포트에서 동작한다면)
app.use(cors({
  origin: 'http://211.35.173.34:8081',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key']
}));

const PORT = process.env.PORT || 3000;

var figlet = require("figlet");

figlet("Hello YoungPoong!!", function (err, data) {
  if (err) {
    logger.info("Something went wrong...");
    logger.error(err);
    return;
  }
  logger.info(data);
});

// 서버 타임아웃 설정 (5분 = 300,000ms)
const server = app.listen(PORT, () => {
  logger.info(`Server is running on port:${PORT}`);
});

server.timeout = 300000; // 5분(300초) 타임아웃 설정
server.keepAliveTimeout = 300000; // 커넥션 유지 시간(선택 사항)
