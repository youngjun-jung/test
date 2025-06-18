const { executeQuery } = require('../config/queries');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getSaveplugdtlchk = async (req, res) => {
   const receivedData = req.query;

   const year = receivedData.year;
   const plugid = receivedData.plugid;

   const query = `SELECT PLUG_ID, COMMENTS, TIMEMARK, PROCID, USE_YN, DELETETIME, DELETEID, GUBUN, SALE_YN, MONTH
                  FROM PLAN_PLUG
                  WHERE PLUG_ID LIKE :year
                  AND USE_YN = 'Y'
                  AND PLUG_ID LIKE :plugid
                  ORDER BY PLUG_ID DESC`;

  const binds = {year: year, plugid: plugid};
  
    try {
      const data = await executeQuery(query, binds); // 데이터 조회
      res.json({ success: true, data }); // JSON 형식으로 응답

    } catch (err) {
      res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
    }
  };

 // 비즈니스 로직
exports.deleteSaveplugdtl = async (req, res) => {

  const receivedData = req.body;

  const plugid = receivedData.plugid;

  logger.info(`req plugid : ${plugid}`);

  if (!plugid) {
    res.status(400).json({ success: false, message: 'FIELD 오류(NULL)'});
  }
  else{
    const query = 'DELETE PLAN_PLUG WHERE PLUG_ID = :plugid';

    const binds = {plugid: plugid};

    try {
      const data = await executeQuery(query, binds); // 데이터 조회
      res.json({ success: true, message: '데이터 삭제 성공' }); // JSON 형식으로 응답

    } catch (err) {
      res.status(500).json({ success: false, message: '데이터 삭제 실패', error: err.message });
    }
  }
 };

  // 비즈니스 로직
exports.patchSaveplugdtlchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.body;

  const plugid = receivedData.plugid;
  const comments = receivedData.comments;
  const gubun = receivedData.gubun;
  const sale_yn = receivedData.sale_yn;

  logger.info(`req plugid : ${plugid}`);
  logger.info(`req comments : ${comments}`);
  logger.info(`req gubun : ${gubun}`);
  logger.info(`req sale_yn : ${sale_yn}`);

  if (!plugid) {
    res.status(400).json({ success: false, message: 'FIELD 오류(NULL)'});
  }
  else{
    const query = 'UPDATE PLAN_PLUG SET COMMENTS = :comments, gubun = :gubun, sale_yn = :sale_yn WHERE PLUG_ID = :plugid';

    const binds = {comments: comments, gubun: gubun, sale_yn: sale_yn, plugid: plugid};
  
    try {
      const data = await executeQuery(query, binds); // 데이터 조회
      res.json({ success: true, message: '데이터 수정 성공' }); // JSON 형식으로 응답

    } catch (err) {
      res.status(500).json({ success: false, message: '데이터 수정 실패', error: err.message });
    }
  }
 };
