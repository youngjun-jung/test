const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// 사용자 API 라우트 정의
router.get('/', userController.getAllUsers); // 모든 사용자 조회
router.post('/', userController.createUser); // 사용자 생성

module.exports = router;
