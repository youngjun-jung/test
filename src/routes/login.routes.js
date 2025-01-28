const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login.controller');
const checkApiKey = require('../middleware/authMiddleware'); // 인증 미들웨어 가져오기

// key 인증 후 API 라우트 정의
router.get('/', checkApiKey, loginController.getLoginchk);
router.post('/', checkApiKey, loginController.postLoginchk);
router.delete('/', checkApiKey, loginController.deleteLoginchk);
router.put('/', checkApiKey, loginController.putLoginchk);
router.patch('/', checkApiKey, loginController.patchLoginchk);

module.exports = router;
