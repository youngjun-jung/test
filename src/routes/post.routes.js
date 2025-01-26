const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');

// 게시물 API 라우트 정의
router.get('/', postController.getAllPosts); // 모든 게시물 조회
router.post('/', postController.createPost); // 게시물 생성

module.exports = router;
