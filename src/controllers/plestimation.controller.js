const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/plestimation.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getPlestimationchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;

  console.log("year: ", year);
/*
  // 프로시저 호출
    const data1 = await executeProcedure.callPlestimationproc(year);

    logger.info(`req data : ${JSON.stringify(data1, null, 2)}`);

    if (!data1 || Object.keys(data1).length === 0) {
      res.status(404).json({ success: false, message: '오류 정보 저장 실패', error: 'User insert error' });
    }
*/
  const query = `SELECT X.YEAR, X.SCODE, X.SNAME
              , SUM(DECODE(A.SCODE_2, 'PLEDC001', A.VALUE, 0)) PLEDC001
              , SUM(DECODE(A.SCODE_2, 'PLEDC002', A.VALUE, 0)) PLEDC002
              , SUM(DECODE(A.SCODE_2, 'PLEDC003', A.VALUE, 0)) PLEDC003
              , SUM(DECODE(A.SCODE_2, 'PLEDC004', A.VALUE, 0)) PLEDC004
              , SUM(DECODE(A.SCODE_2, 'PLEDC005', A.VALUE, 0)) PLEDC005
              , SUM(DECODE(A.SCODE_2, 'PLEDC006', A.VALUE, 0)) PLEDC006
              , 0 PLEDC007
              FROM PLAN_PL_ESTIMATION_CODE X, PLAN_PL_ESTIMATION A
              WHERE X.SCODE = A.SCODE_1(+)
              AND X.YEAR = A.YEAR(+)
              AND X.YEAR = :year
              GROUP BY X.YEAR, X.SCODE, X.SNAME
              UNION ALL
              SELECT X.YEAR, 'PLEC099' SCODE, '본부' SNAME
              , 0 PLEDC001
              , 0 PLEDC002
              , 0 PLEDC003
              , 0 PLEDC004
              , 0 PLEDC005
              , 0 PLEDC006
              , 50000 PLEDC007
              FROM PLAN_PL_ESTIMATION_CODE X, PLAN_PL_ESTIMATION A
              WHERE X.SCODE = A.SCODE_1(+)
              AND X.YEAR = A.YEAR(+)
              AND X.YEAR = :year
              AND ROWNUM = 1
              GROUP BY X.YEAR, X.SCODE, X.SNAME 
              ORDER BY SCODE`;                 

 const binds = {year: year};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
