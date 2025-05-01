const { executeQuery } = require('../config/queries');
const executeProcedure = require('../procedures/login.procedure');
const logger = require('../../logger'); 

// 로그인 관련 비즈니스 로직
exports.getLoginchk = async (req, res) => {
   const query = 'select userid, username, passwd FROM adm_user where userid = :userid';
   //const binds = {userid: 'jminzzang'};
   const binds = ['jminzzang1'];
  
    try {
      const data = await executeQuery(query, binds); // 데이터 조회
      res.json({ success: true, data }); // JSON 형식으로 응답

    } catch (err) {
      res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
    }
  };

// 로그인 관련 비즈니스 로직
exports.postLoginchk = async (req, res) => { 
  try {
    // 요청 본문에서 JSON 데이터 추출
    const receivedData = req.body;

    //logger.info(JSON.stringify(receivedData, null, 2));

    const id = receivedData.id;
    const pw = receivedData.pw;

    logger.info(`req id : ${id}`);
    logger.info(`req pw : ${pw}`);

    // 저장 프로시저 호출
    const data = await executeProcedure.callLoginproc(id, pw);

    logger.info(`req data : ${JSON.stringify(data, null, 2)}`);

    const returnCode = data.returncode    
 
    if (!data || Object.keys(data).length === 0 || returnCode === 'N') {
      logger.error('[404]Error User not found');
      res.json({ success: false, message: '사용자 없음', error: 'User not found' });
    }
    else {
      res.json({ success: true, data }); // JSON 형식으로 응답
    }

  } catch (err) {
    logger.error('[500]Error calling stored procedure:', err);
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
 };

 /*
  // 로그인 관련 비즈니스 로직
exports.postLoginchk = async (req, res) => {

   // 요청 본문에서 JSON 데이터 추출
   const receivedData = req.body;

    //logger.info(JSON.stringify(receivedData, null, 2));

   const id = receivedData.id;
   const pw = receivedData.pw;

   logger.info(`id = ${id}`);
   logger.info(`pw = ${pw}`);
 
   const query = 'select userid, username, passwd FROM adm_user';
   const binds = [];
  
    try {
      const data = await executeQuery(query, binds); // 데이터 조회
      res.json({ success: true, data }); // JSON 형식으로 응답

    } catch (err) {
      res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
    }
  };
*/

  // 로그인 관련 비즈니스 로직
exports.deleteLoginchk = async (req, res) => {

const query = 'select userid, username FROM adm_user';
const binds = [];

    try {
      const data = await executeQuery(query, binds); // 데이터 조회
      res.json({ success: true, data }); // JSON 형식으로 응답

    } catch (err) {
      res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
    }
};

 // 로그인 관련 비즈니스 로직
 exports.putLoginchk = async (req, res) => {

const query = 'select userid, username, 123123123123 put  FROM adm_user';
const binds = [];

    try {
      const data = await executeQuery(query, binds); // 데이터 조회
      res.json({ success: true, data }); // JSON 형식으로 응답

    } catch (err) {
      res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
    }
};

 // 로그인 관련 비즈니스 로직
 exports.patchLoginchk = async (req, res) => {

const query = 'select userid, username, 123123123123 patch FROM adm_user';
const binds = [];

    try {
      const data = await executeQuery(query, binds); // 데이터 조회
      res.json({ success: true, data }); // JSON 형식으로 응답

    } catch (err) {
      res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
    }
};
  
