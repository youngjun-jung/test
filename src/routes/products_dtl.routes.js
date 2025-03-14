const express = require('express');
const router = express.Router();
const products_dtlController = require('../controllers/products_dtl.controller');
const checkApiKey = require('../middleware/authMiddleware'); // 인증 미들웨어 가져오기

// key 인증 후 API 라우트 정의
router.get('/', checkApiKey, products_dtlController.getProducts_dtlchk);

module.exports = router;
