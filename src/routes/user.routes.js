const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const checkApiKey = require('../middleware/authMiddleware'); // 인증 미들웨어 가져오기

// key 인증 후 API 라우트 정의
router.get('/', checkApiKey, userController.getUser);
router.post('/', checkApiKey, userController.postUser);
router.delete('/:id', checkApiKey, userController.deleteUser);
//router.put('/', checkApiKey, userController.putUser);
//router.patch('/', checkApiKey, userController.patchUser);

module.exports = router;
