const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/planmonthlyinventory.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getPlanmonthlyinventorychk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const backupid = receivedData.backupid;
  const gubun = receivedData.gubun;

  console.log("backupid: ", backupid);
  console.log("gubun: ", gubun);
/*
  // 프로시저 호출
  const data1 = await executeProcedure.callPlanmonthlyinventoryproc(year);

  logger.info(`req data : ${JSON.stringify(data1, null, 2)}`);

  if (!data1 || Object.keys(data1).length === 0) {
    res.status(404).json({ success: false, message: '오류 정보 저장 실패', error: 'User insert error' });
  }
*/

  query = `SELECT X.YEAR, X.MNAME, X.SNAME
          , NVL(MONTH_01, 0) MONTH_01, NVL(MONTH_02, 0) MONTH_02, NVL(MONTH_03, 0) MONTH_03, NVL(MONTH_04, 0) MONTH_04
          , NVL(MONTH_05, 0) MONTH_05, NVL(MONTH_06, 0) MONTH_06, NVL(MONTH_07, 0) MONTH_07, NVL(MONTH_08, 0) MONTH_08
          , NVL(MONTH_09, 0) MONTH_09, NVL(MONTH_10, 0) MONTH_10, NVL(MONTH_11, 0) MONTH_11, NVL(MONTH_12, 0) MONTH_12
          FROM BAK_PLANNING_MONTHLY_INVENTORY_CODE X, BAK_PLANNING_MONTHLY_INVENTORY A
          WHERE X.SCODE = A.SCODE_1(+)
          AND X.BACKUP_ID = A.BACKUP_ID(+)
          AND X.BACKUP_ID = :backupid
          AND X.USE_YN = 'Y'
          ORDER BY X.IDX, A.IDX`; 

  binds = {backupid: backupid};                       
  
  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
