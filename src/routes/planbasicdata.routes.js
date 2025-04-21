const express = require('express');
const router = express.Router();
const planbasicdataController = require('../controllers/planbasicdata.controller');
const checkApiKey = require('../middleware/authMiddleware'); // 인증 미들웨어 가져오기

// key 인증 후 API 라우트 정의
router.patch('/', checkApiKey, planbasicdataController.patchPlanbasicdatachk);

module.exports = router;
