const express = require('express');
const router = express.Router();
const refindicatorController = require('../controllers/backrefindicator.controller');
const checkApiKey = require('../middleware/authMiddleware'); // 인증 미들웨어 가져오기

// key 인증 후 API 라우트 정의
router.get('/', checkApiKey, refindicatorController.getRefindicatorchk);
router.patch('/', checkApiKey, refindicatorController.patchRefindicatorchk);

module.exports = router;
