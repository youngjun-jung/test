const express = require('express');
const router = express.Router();
const groupController = require('../controllers/group.controller');
const checkApiKey = require('../middleware/authMiddleware'); // 인증 미들웨어 가져오기

// key 인증 후 API 라우트 정의
router.get('/', checkApiKey, groupController.getGroup);
//router.post('/', checkApiKey, userController.postGroup);
//router.delete('/:id', checkApiKey, userController.deleteGroup);
//router.put('/', checkApiKey, userController.putGroup);
//router.patch('/', checkApiKey, userController.patchGroup);

module.exports = router;
