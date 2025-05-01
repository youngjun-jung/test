const express = require('express');
const router = express.Router();
const elecrectifiercostController = require('../controllers/elecrectifiercost.controller');
const checkApiKey = require('../middleware/authMiddleware'); // 인증 미들웨어 가져오기

// key 인증 후 API 라우트 정의
router.get('/', checkApiKey,elecrectifiercostController.getElecrectifiercostchk);
router.patch('/', checkApiKey, elecrectifiercostController.patchElecrectifiercostchk);

module.exports = router;
