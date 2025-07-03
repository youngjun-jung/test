const express = require('express');
const router = express.Router();
const elecnewrectifierController = require('../controllers/elecnewrectifier.controller');
const checkApiKey = require('../middleware/authMiddleware'); // 인증 미들웨어 가져오기

// key 인증 후 API 라우트 정의
router.get('/', checkApiKey, elecnewrectifierController.getElecnewrectifierchk);

module.exports = router;
