const { executeQuery } = require('../config/queries');
const executeProcedure = require('../procedures/user.procedure');
const logger = require('../../logger'); 

  // 사용자 조회 로직
exports.getUser = async (req, res) => {
 
   const receivedData = req.query;

   const id = receivedData.id;

   const query = `SELECT USERID, USERNAME, A.GROUPID, B.GROUPNAME, PASSWD, FAIL_CNT 
                  FROM ADM_USER A, ADM_GROUP B
                  WHERE A.GROUPID = B.GROUPID 
                  AND A.USERID LIKE :userid
                  ORDER BY A.GROUPID, USERID`;

  const binds = {userid: id};
  
    try {
      const data = await executeQuery(query, binds); // 데이터 조회
      res.json({ success: true, data }); // JSON 형식으로 응답

    } catch (err) {
      res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
    }
  };

  // 사용자 추가 로직
exports.postUser = async (req, res) => {

  try {
    // 요청 본문에서 JSON 데이터 추출
    const receivedData = req.body;

    const userid = receivedData.userid;
    const username = receivedData.username;
    const passwd = receivedData.passwd;
    const groupid = receivedData.groupid;

    logger.info(`req userid : ${userid}`);
    logger.info(`req username : ${username}`);
    logger.info(`req passwd : ${passwd}`);
    logger.info(`req groupid : ${groupid}`);

    // 저장 프로시저 호출
    const data = await executeProcedure.callUserproc("ADD", userid, username, passwd, groupid);

    logger.info(`req data : ${JSON.stringify(data, null, 2)}`);

    if (!data || Object.keys(data).length === 0) {
      res.status(404).json({ success: false, message: '사용자 생성 실패', error: 'User insert error' });
    }

    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '사용자 생성 실패', error: err.message });
  }
 };

 // 사용자 삭제 로직
exports.deleteUser = async (req, res) => {

  try {
    const id = req.params.id; // URL 경로에서 id 파라미터 추출

    console.log('userid:', id);

    if (!id) {
      res.status(400).json({ success: false, message: 'FIELD 오류(NULL)'});
    }
 
    // 삭제 프로시저 호출
    const data = await executeProcedure.callUserproc("DEL", id, '', '', '');

    if (!data || Object.keys(data).length === 0) {
      res.status(404).json({ success: false, message: '사용자 삭제 실패', error: 'User delete error' });
    }

    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '사용자 삭제 실패', error: err.message });
  }
 };

  // 사용자 수정 로직
exports.patchUser = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.body;

  const id = receivedData.userid;
  const wd = receivedData.passwd;
  const cnt = receivedData.fail_cnt;

  console.log('userid:', id);
  console.log('passwd:', wd);
  console.log('fail_cnt:', cnt);

  if (!id || !wd || !cnt) {
    res.status(400).json({ success: false, message: 'FIELD 오류(NULL)'});
  }
 
  const query = 'UPDATE ADM_USER SET PASSWD = :passwd, FAIL_CNT = TO_NUMBER(:fail_cnt) WHERE USERID = :userid';

  const binds = {userid: id, passwd: wd, fail_cnt: cnt};
 
   try {
     const data = await executeQuery(query, binds); // 데이터 조회
     res.json({ success: true, message: '데이터 수정 성공' }); // JSON 형식으로 응답

   } catch (err) {
     res.status(500).json({ success: false, message: '데이터 수정 실패', error: err.message });
   }
 };
