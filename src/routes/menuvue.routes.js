const express = require('express');
const router = express.Router();
const menuvueController = require('../controllers/menuvue.controller');
const checkApiKey = require('../middleware/authMiddleware'); // 인증 미들웨어 가져오기

// key 인증 후 API 라우트 정의
router.get('/', checkApiKey, menuvueController.getMenuchk);
//router.post('/', checkApiKey, menuController.postMenuchk);
//router.delete('/', checkApiKey, menuController.deleteMenuchk);
//router.put('/', checkApiKey, menuController.putMenuchk);
//router.patch('/', checkApiKey, menuController.patchMenuchk);

module.exports = router;
