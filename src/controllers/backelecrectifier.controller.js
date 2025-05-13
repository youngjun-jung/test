const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/elecrectifier.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getElecrectifierchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const backupid = receivedData.backupid;
  const gubun = receivedData.gubun;

  console.log("backupid: ", backupid);
  console.log("gubun: ", gubun);
/*
  // 프로시저 호출
  const data1 = await executeProcedure.callElecrectifierproc(year);

  logger.info(`req data : ${JSON.stringify(data1, null, 2)}`);

  if (!data1 || Object.keys(data1).length === 0) {
    res.status(404).json({ success: false, message: '오류 정보 저장 실패', error: 'User insert error' });
  }
*/
  query = `SELECT A.YEAR, A.SNAME, A.XSUM, A.XA, A.XB, A.XC, B.XSUM YSUM, B.XA YA, B.XB YB, B.XC YC
            FROM (
                SELECT A.YEAR, A.SNAME, XSUM, XA, XB, XC
                FROM BACKUP_PLAN_ELEC_RECTIFIER_CODE A, BACKUP_PLAN_ELEC_RECTIFIER B
                WHERE A.SCODE = B.SCODE(+)
                AND A.BACKUP_ID = B.BACKUP_ID(+)
                AND A.BACKUP_ID = :backupid         
                AND B.GUBUN(+) = :gubun
                ) A,
                (
                SELECT A.YEAR, A.SNAME, XSUM, XA, XB, XC
                FROM BACKUP_PLAN_ELEC_RECTIFIER_CODE A, BACKUP_PLAN_ELEC_RECTIFIER_DTL B
                WHERE A.SCODE = B.SCODE(+)
                AND A.BACKUP_ID = B.BACKUP_ID(+)
                AND A.BACKUP_ID = :backupid         
                AND B.GUBUN(+) = :gubun
                ) B
            WHERE A.SNAME = B.SNAME `; 

  binds = {backupid: backupid, gubun: gubun};                       
  
  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
