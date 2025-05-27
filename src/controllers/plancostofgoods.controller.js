const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/plancostofgoods.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getPlancostofgoodschk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;
  const procid = receivedData.procid;

  console.log("year: ", year);
  console.log("procid: ", procid);
/*
  // 프로시저 호출
    const data1 = await executeProcedure.callPlancostofgoodsproc(year, procid);

    logger.info(`req data : ${JSON.stringify(data1, null, 2)}`);

    if (!data1 || Object.keys(data1).length === 0) {
      res.status(404).json({ success: false, message: '오류 정보 저장 실패', error: 'User insert error' });
    }
*/
  const query = `SELECT A.YEAR, A.LNAME, A.MNAME, A.SNAME
              , NVL(MONTH_01, 0) MONTH_01, NVL(MONTH_02, 0) MONTH_02, NVL(MONTH_03, 0) MONTH_03
              , (NVL(MONTH_01, 0) + NVL(MONTH_02, 0) + NVL(MONTH_03, 0)) / DECODE(A.SNAME, '단가', 3, 1) MONTH_1
              , NVL(MONTH_04, 0) MONTH_04, NVL(MONTH_05, 0) MONTH_05, NVL(MONTH_06, 0) MONTH_06
              , (NVL(MONTH_04, 0) + NVL(MONTH_05, 0) + NVL(MONTH_06, 0)) / DECODE(A.SNAME, '단가', 3, 1) MONTH_2
              , NVL(MONTH_07, 0) MONTH_07, NVL(MONTH_08, 0) MONTH_08, NVL(MONTH_09, 0) MONTH_09
              , (NVL(MONTH_07, 0) + NVL(MONTH_08, 0) + NVL(MONTH_09, 0)) / DECODE(A.SNAME, '단가', 3, 1) MONTH_3
              , NVL(MONTH_10, 0) MONTH_10, NVL(MONTH_11, 0) MONTH_11, NVL(MONTH_12, 0) MONTH_12
              , (NVL(MONTH_10, 0) + NVL(MONTH_11, 0) + NVL(MONTH_12, 0)) / DECODE(A.SNAME, '단가', 3, 1) MONTH_4
              , NVL(MONTH_0, 0) / DECODE(A.SNAME, '단가', 12, 1) MONTH_0
              FROM PLAN_COST_OF_GOODS_CODE A, PLAN_COST_OF_GOODS B
              WHERE A.SCODE = B.SCODE(+)
              AND A.YEAR = B.YEAR(+)
              AND A.YEAR = :year
              AND A.USE_YN = 'Y'
              AND B.PROCID(+) = :procid
              ORDER BY A.IDX`;                 

  const binds = {year: year, procid: procid};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
