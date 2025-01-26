const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login.controller');

// 게시물 API 라우트 정의
router.get('/', loginController.getLoginchk); // 모든 게시물 조회

module.exports = router;
