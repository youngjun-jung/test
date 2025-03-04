require('dotenv').config(); // .env 파일 로드
const logger = require('../../logger'); 

// 환경 변수에서 API 키 가져오기
const API_KEY = process.env.API_KEY;

// API 키 검증 미들웨어
function checkApiKey(req, res, next) {
  // 쿼리에서 키추출 제외
  //const apiKey = req.query.api_key || req.headers['x-api-key']; // 쿼리 또는 헤더에서 API 키 확인
  const apiKey = req.headers['x-api-key']; //  헤더에서 API 키 확인

  logger.info(`Requested URL : ${req.baseUrl}${req.url}`);  
  logger.info(`x-api-key : ${apiKey}`);

  if (apiKey === API_KEY) {
    next(); // 유효한 API 키인 경우 다음 미들웨어로 이동
  } else {
    res.status(403).json({ success: false, message: 'Forbidden: Invalid API Key', error: 'Invalid API Key' });
    //res.status(403).send('Forbidden: Invalid API Key'); // 유효하지 않은 경우 403 응답
  }
}

module.exports = checkApiKey;
