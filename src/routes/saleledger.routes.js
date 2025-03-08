const express = require('express');
const router = express.Router();
const saleledgerController = require('../controllers/saleledger.controller');
const checkApiKey = require('../middleware/authMiddleware'); // 인증 미들웨어 가져오기

// key 인증 후 API 라우트 정의
router.get('/', checkApiKey, saleledgerController.getSaleledgerchk);
//router.post('/', checkApiKey, menuController.postSalechk);
//router.delete('/', checkApiKey, menuController.deleteSalechk);
//router.put('/', checkApiKey, menuController.putSalechk);
//router.patch('/', checkApiKey, menuController.patchSalechk);

module.exports = router;
