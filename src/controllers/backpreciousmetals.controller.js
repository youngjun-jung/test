const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/preciousmetals.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getPreciousmetalschk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const backupid = receivedData.backupid;

  console.log("backupid: ", backupid);
/*
   // 프로시저 호출
   const data1 = await executeProcedure.callPreciousmetalsproc(year);

   logger.info(`req data : ${JSON.stringify(data1, null, 2)}`);
 
   if (!data1 || Object.keys(data1).length === 0) {
     res.status(404).json({ success: false, message: '오류 정보 저장 실패', error: 'User insert error' });
   }
*/
  const query = `SELECT A.YEAR, A.MNAME, A.SNAME, MEASURE, MONTH_01, MONTH_02, MONTH_03, MONTH_04, MONTH_05, MONTH_06
                , MONTH_07, MONTH_08, MONTH_09, MONTH_10, MONTH_11, MONTH_12
                            FROM BACKUP_PLAN_PRECIOUS_METALS_CODE A, BACKUP_PLAN_PRECIOUS_METALS B
                            WHERE A.BACKUP_ID = B.BACKUP_ID(+)
                            AND A.SCODE = B.SCODE(+)
                            AND A.BACKUP_ID = :backupid
                            ORDER BY A.IDX`;                 

   const binds = {backupid: backupid};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
