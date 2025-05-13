const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/elecrectifier.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getElecrectifierplanchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const backupid = receivedData.backupid;

  console.log("backupid: ", backupid);
/*
  // 프로시저 호출
  const data1 = await executeProcedure.callElecrectifierproc(year);

  logger.info(`req data : ${JSON.stringify(data1, null, 2)}`);

  if (!data1 || Object.keys(data1).length === 0) {
    res.status(404).json({ success: false, message: '오류 정보 저장 실패', error: 'User insert error' });
  }
*/
  query = `SELECT A.YEAR, A.SNAME, B.X01, B.X02, B.X11, B.X12, B.XAVG, B.XAMT
          , (SELECT TO_CHAR(ROUND(VALUE, 0), 'FM999,999,999,999') FROM BACKUP_PLAN_ELEC_RECTIFIER_FINAL WHERE BACKUP_ID = A.BACKUP_ID AND SCODE = 'PERF001') FINAL
          FROM BACKUP_PLAN_ELEC_RECTIFIER_PLAN_CODE A, BACKUP_PLAN_ELEC_RECTIFIER_PLAN B
          WHERE A.SCODE = B.SCODE(+)
          AND A.BACKUP_ID = B.BACKUP_ID(+)
          AND A.BACKUP_ID = :backupid
          ORDER BY A.IDX `; 

  binds = {backupid: backupid};                       
  
  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
