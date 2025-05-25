const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/elecrectifier.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getElecrectifierplanchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;
  const procid = receivedData.procid;

  console.log("year: ", year);
  console.log("procid: ", procid);
/*
  // 프로시저 호출
  const data1 = await executeProcedure.callElecrectifierproc(year, procid);

  logger.info(`req data : ${JSON.stringify(data1, null, 2)}`);

  if (!data1 || Object.keys(data1).length === 0) {
    res.status(404).json({ success: false, message: '오류 정보 저장 실패', error: 'User insert error' });
  }
*/
  query = `SELECT A.YEAR, A.SNAME, B.X01, B.X02, B.X11, B.X12, B.XAVG, B.XAMT
          , (SELECT TO_CHAR(ROUND(VALUE, 0), 'FM999,999,999,999') FROM PLAN_ELEC_RECTIFIER_FINAL WHERE YEAR = A.YEAR AND SCODE = 'PERF001' AND PROCID = :procid) FINAL
          FROM PLAN_ELEC_RECTIFIER_PLAN_CODE A, PLAN_ELEC_RECTIFIER_PLAN B
          WHERE A.SCODE = B.SCODE(+)
          AND A.YEAR = B.YEAR(+)
          AND A.YEAR = :year
          AND B.PROCID(+) = :procid
          ORDER BY A.IDX `; 

  binds = {year: year, procid: procid};                       
  
  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
