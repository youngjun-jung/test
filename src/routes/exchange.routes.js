const express = require('express');
const router = express.Router();
const exchangeController = require('../controllers/exchange.controller');
const checkApiKey = require('../middleware/authMiddleware'); // 인증 미들웨어 가져오기

// key 인증 후 API 라우트 정의
//router.get('/', checkApiKey, exchangeController.getExchangechk);
router.post('/', checkApiKey, exchangeController.postExchangechk);
//router.delete('/', checkApiKey, exchangeController.deleteExchangechk);
//router.put('/', checkApiKey, exchangeController.putExchangechk);
//router.patch('/', checkApiKey, exchangeController.patchExchangechk);

module.exports = router;
