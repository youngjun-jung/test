const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file.controller');
const checkApiKey = require('../middleware/authMiddleware'); // 인증 미들웨어 가져오기

// key 인증 후 API 라우트 정의
router.get('/', checkApiKey, fileController.getfile);
//router.post('/', checkApiKey, fileController.postfile);
//router.delete('/:fileid', checkApiKey, fileController.deletefile);
//router.put('/', checkApiKey, fileController.putfile);
//router.patch('/', checkApiKey, fileController.patchfile);

module.exports = router;
