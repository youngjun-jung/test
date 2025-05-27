const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/refmanual.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getRef2chk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;
  const procid = receivedData.procid;

  console.log("year: ", year);
  console.log("procid: ", procid);
/*
  // 프로시저 호출
  const data1 = await executeProcedure.callRefmanualproc(year, procid);

  logger.info(`req data : ${JSON.stringify(data1, null, 2)}`);

  if (!data1 || Object.keys(data1).length === 0) {
    res.status(404).json({ success: false, message: '오류 정보 저장 실패', error: 'User insert error' });
  }
*/
  const query = `SELECT A.NUM, A.XA, A.XB, A.XC
              , B.MONTH_01, B.MONTH_02, B.MONTH_03, B.MONTH_01 + B.MONTH_02 + B.MONTH_03 MONTH_1
              , B.MONTH_04, B.MONTH_05, B.MONTH_06, B.MONTH_04 + B.MONTH_05 + B.MONTH_06 MONTH_2
              , B.MONTH_07, B.MONTH_08, B.MONTH_09, B.MONTH_07 + B.MONTH_08 + B.MONTH_09 MONTH_3
              , B.MONTH_10, B.MONTH_11, B.MONTH_12, B.MONTH_10 + B.MONTH_11 + B.MONTH_12 MONTH_4
              , B.MONTH_01 + B.MONTH_02 + B.MONTH_03 + B.MONTH_04 + B.MONTH_05 + B.MONTH_06 + B.MONTH_07 + B.MONTH_08 + B.MONTH_09 + B.MONTH_10 + B.MONTH_11 + B.MONTH_12 MONTH_0
              FROM PLAN_REF_MANUAL_CODE A, PLAN_REF_MANUAL B
              WHERE A.XB = B.NAME(+)
              AND A.YEAR = B.YEAR(+)
              AND A.YEAR = :year
              AND A.USE_YN = 'Y'
              AND B.PROCID(+) = :procid
              ORDER BY A.NUM`;                 

 const binds = {year: year, procid: procid};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
