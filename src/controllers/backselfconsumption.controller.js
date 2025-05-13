const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/selfconsumption.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getSelfconsumptionchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const backupid = receivedData.backupid;

  console.log("backupid: ", backupid);
/*
  // 프로시저 호출
    const data1 = await executeProcedure.callSelfconsumptionproc(year);

    logger.info(`req data : ${JSON.stringify(data1, null, 2)}`);

    if (!data1 || Object.keys(data1).length === 0) {
      res.status(404).json({ success: false, message: '오류 정보 저장 실패', error: 'User insert error' });
    }
*/
  const query = `SELECT A.YEAR, A.LNAME, A.MNAME, A.MEASURE
                , MONTH_01, MONTH_02, MONTH_03, MONTH_01 + MONTH_02 + MONTH_03 MONTH_1
                , MONTH_04, MONTH_05, MONTH_06, MONTH_04 + MONTH_05 + MONTH_06 MONTH_2
                , MONTH_07, MONTH_08, MONTH_09, MONTH_07 + MONTH_08 + MONTH_09 MONTH_3
                , MONTH_10, MONTH_11, MONTH_12, MONTH_10 + MONTH_11 + MONTH_12 MONTH_4
                , MONTH_01 + MONTH_02 + MONTH_03 + MONTH_04 + MONTH_05 + MONTH_06 + MONTH_07 + MONTH_08 + MONTH_09 + MONTH_10 + MONTH_11 + MONTH_12 MONTH_0
                FROM BACKUP_PLAN_SELF_CONSUMPTION_CODE A, BACKUP_PLAN_SELF_CONSUMPTION B, BACKUP_PLAN_SELF_CONSUMPTION_MANUAL C
                WHERE A.LNAME = B.LNAME(+)
                AND A.MNAME = B.MNAME(+)
                AND A.BACKUP_ID = B.BACKUP_ID(+)
                AND A.LNAME = C.LNAME(+)
                AND A.MNAME = C.MNAME(+)
                AND A.BACKUP_ID = C.BACKUP_ID(+)
                AND A.BACKUP_ID = :backupid
                ORDER BY A.NUM`;                 

 const binds = {backupid: backupid};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
