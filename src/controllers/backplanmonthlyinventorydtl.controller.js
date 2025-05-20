const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/planmonthlyinventory.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getBackplanmonthlyinventorydtlchk = async (req, res) => {

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
          , DECODE(SUBSTR(A.SCODE, 8, 1), '3', ((SELECT VALUE FROM PLANNING_MONTHLY_INVENTORY_MANUAL WHERE YEAR = X.YEAR AND SCODE = 'PNMIM' || SUBSTR(A.SCODE, 5, 3) || '1') * (SELECT VALUE FROM PLANNING_MONTHLY_INVENTORY_MANUAL WHERE YEAR = X.YEAR AND SCODE = 'PNMIM' || SUBSTR(A.SCODE, 5, 3) || '2') / 1000),
          (SELECT VALUE FROM PLANNING_MONTHLY_INVENTORY_MANUAL WHERE YEAR = X.YEAR AND SCODE = 'PNMIM' || SUBSTR(A.SCODE, 5, 4)))  BASIC
          , MONTH_01_1, MONTH_01_2, MONTH_01_3, MONTH_01_4, MONTH_02_1, MONTH_02_2, MONTH_02_3, MONTH_02_4, MONTH_03_1, MONTH_03_2, MONTH_03_3, MONTH_03_4
          , MONTH_04_1, MONTH_04_2, MONTH_04_3, MONTH_04_4, MONTH_05_1, MONTH_05_2, MONTH_05_3, MONTH_05_4, MONTH_06_1, MONTH_06_2, MONTH_06_3, MONTH_06_4
          , MONTH_07_1, MONTH_07_2, MONTH_07_3, MONTH_07_4, MONTH_08_1, MONTH_08_2, MONTH_08_3, MONTH_08_4, MONTH_09_1, MONTH_09_2, MONTH_09_3, MONTH_09_4
          , MONTH_10_1, MONTH_10_2, MONTH_10_3, MONTH_10_4, MONTH_11_1, MONTH_11_2, MONTH_11_3, MONTH_11_4, MONTH_12_1, MONTH_12_2, MONTH_12_3, MONTH_12_4
          FROM BAK_PLANNING_MONTHLY_INVENTORY_CODE X, BAK_PLANNING_MONTHLY_INVENTORY_DTL A
          WHERE X.SCODE = A.SCODE(+)
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
