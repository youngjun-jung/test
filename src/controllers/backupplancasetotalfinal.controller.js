const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/plantotalfinal.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getBackupplancasetotalfinalchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const backup_id = receivedData.backup_id;

  console.log("backup_id: ", backup_id);
/*
  // 프로시저 호출
  const data1 = await executeProcedure.callPlantotalfinalproc(year);

  logger.info(`req data : ${JSON.stringify(data1, null, 2)}`);

  if (!data1 || Object.keys(data1).length === 0) {
    res.status(404).json({ success: false, message: '오류 정보 저장 실패', error: 'User insert error' });
  }
*/
  query = `SELECT YEAR, '' LNAME, '' MNAME, '아연괴 수' SNAME, VALUE MONTH_0
            FROM BACKUP_PLAN_PROC_ZINC_CNT
            WHERE BACKUP_ID = :backup_id
            AND SCODE = 'PPZC002'
            UNION ALL
            SELECT YEAR, GUBUN1, GUBUN2, '평균', DECODE(ANNUAL, NULL, (MONTH_01 + MONTH_02 + MONTH_03 + MONTH_04 + MONTH_05 + MONTH_06 + MONTH_07 + MONTH_08 + MONTH_09 + MONTH_10 + MONTH_11 + MONTH_12) / 12
                            , 0, (MONTH_01 + MONTH_02 + MONTH_03 + MONTH_04 + MONTH_05 + MONTH_06 + MONTH_07 + MONTH_08 + MONTH_09 + MONTH_10 + MONTH_11 + MONTH_12) / 12, ANNUAL)
            FROM BACKUP_PLAN_REF_INDICATOR
            WHERE BACKUP_ID = :backup_id
            AND SCODE IN ('RI001', 'RI002', 'RI003', 'RI005', 'RI006', 'RI008', 'RI009', 'RI010', 'RI011', 'RI018', 'RI019', 'RI020')
            UNION ALL
            SELECT YEAR, LNAME, MNAME, SNAME, MONTH_0
            FROM (
                  SELECT A.YEAR, A.LNAME, A.MNAME, A.SNAME, B.MONTH_0
                  FROM BACKUP_PLAN_TOTAL_FINAL_CODE A, BACKUP_PLAN_TOTAL_FINAL B
                  WHERE A.SCODE = B.SCODE(+)
                  AND A.BACKUP_ID = B.BACKUP_ID(+)
                  AND A.BACKUP_ID = :backup_id
                  ORDER BY A.IDX
                  ) `; 

  binds = {backup_id: backup_id};                       
  
  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
