const express = require('express');
const router = express.Router();
const procnew1Controller = require('../controllers/procnew1.controller');
const checkApiKey = require('../middleware/authMiddleware'); // 인증 미들웨어 가져오기

// key 인증 후 API 라우트 정의
router.post('/', checkApiKey, procnew1Controller.postProcnew1chk);

module.exports = router;
