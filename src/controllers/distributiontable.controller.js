const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/distributiontable.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getDistributiontablechk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;

  console.log("year: ", year);

  // 프로시저 호출
  const data1 = await executeProcedure.callDistributiontableproc(year);

  logger.info(`req data : ${JSON.stringify(data1, null, 2)}`);

  if (!data1 || Object.keys(data1).length === 0) {
    res.status(404).json({ success: false, message: '오류 정보 저장 실패', error: 'User insert error' });
  }

  const query = `SELECT X.SCODE, X.SNAME, X.IDX
                , DECODE(SUM(SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC001', VALUE, 0))) OVER (), 0, 0, SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC001', VALUE, 0)) / SUM(SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC001', VALUE, 0))) OVER () * 100) AS DTDC001_PER
                , SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC001', VALUE, 0)) AS DTDC001
                , DECODE(SUM(SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC002', VALUE, 0))) OVER (), 0, 0, SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC002', VALUE, 0)) / SUM(SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC002', VALUE, 0))) OVER () * 100) AS DTDC002_PER
                , SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC002', VALUE, 0)) AS DTDC002
                , DECODE(SUM(SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC002', VALUE, 0))) OVER (), 0, 0, SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC002', VALUE, 0)) / SUM(SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC002', VALUE, 0))) OVER () * 100) AS DTDC003_PER
                , SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC003', VALUE, 0)) AS DTDC003
                , DECODE(SUM(SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC002', VALUE, 0))) OVER (), 0, 0, SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC002', VALUE, 0)) / SUM(SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC002', VALUE, 0))) OVER () * 100) AS DTDC004_PER
                , SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC004', VALUE, 0)) AS DTDC004
                , DECODE(SUM(SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC005', VALUE, 0))) OVER (), 0, 0, SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC005', VALUE, 0)) / SUM(SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC005', VALUE, 0))) OVER () * 100) AS DTDC005_PER
                , SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC005', VALUE, 0)) AS DTDC005
                , DECODE(SUM(SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC006', VALUE, 0))) OVER (), 0, 0, SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC006', VALUE, 0)) / SUM(SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC006', VALUE, 0))) OVER () * 100) AS DTDC006_PER
                , SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC006', VALUE, 0)) AS DTDC006
                , DECODE(SUM(SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC007', VALUE, 0))) OVER (), 0, 0, SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC007', VALUE, 0)) / SUM(SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC007', VALUE, 0))) OVER () * 100) AS DTDC007_PER
                , SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC007', VALUE, 0)) AS DTDC007
                , DECODE(SUM(SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC008', VALUE, 0))) OVER (), 0, 0, SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC008', VALUE, 0)) / SUM(SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC008', VALUE, 0))) OVER () * 100) AS DTDC008_PER
                , SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC008', VALUE, 0)) AS DTDC008
                , DECODE(SUM(SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC009', VALUE, 0))) OVER (), 0, 0, SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC009', VALUE, 0)) / SUM(SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC009', VALUE, 0))) OVER () * 100) AS DTDC009_PER
                , SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC009', VALUE, 0)) AS DTDC009
                , DECODE(SUM(SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC010', VALUE, 0))) OVER (), 0, 0, SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC010', VALUE, 0)) / SUM(SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC010', VALUE, 0))) OVER () * 100) AS DTDC010_PER
                , SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC010', VALUE, 0)) AS DTDC010
                , DECODE(SUM(SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC011', VALUE, 0))) OVER (), 0, 0, SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC011', VALUE, 0)) / SUM(SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC011', VALUE, 0))) OVER () * 100) AS DTDC011_PER
                , SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC011', VALUE, 0)) AS DTDC011
                , DECODE(SUM(SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC011', VALUE, 0))) OVER (), 0, 0, SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC011', VALUE, 0)) / SUM(SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC011', VALUE, 0))) OVER () * 100) AS DTDC012_PER
                , SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC012', VALUE, 0)) AS DTDC012
                , DECODE(SUM(SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC013', VALUE, 0))) OVER (), 0, 0, SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC013', VALUE, 0)) / SUM(SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC013', VALUE, 0))) OVER () * 100) AS DTDC013_PER
                , SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC013', VALUE, 0)) AS DTDC013
                , DECODE(SUM(SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC014', VALUE, 0))) OVER (), 0, 0, SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC014', VALUE, 0)) / SUM(SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC014', VALUE, 0))) OVER () * 100) AS DTDC014_PER
                , SUM(DECODE(A.SCODE_2, NULL, 0, 'DTDC014', VALUE, 0)) AS DTDC014
                FROM PLAN_DISTRIBUTION_TABLE_CODE X, PLAN_DISTRIBUTION_TABLE A 
                WHERE X.YEAR = A.YEAR(+)
                AND X.SCODE = A.SCODE_1(+)
                AND X.YEAR = :year
                GROUP BY X.SCODE, X.SNAME, X.IDX
                ORDER BY X.IDX`;                 

 const binds = {year: year};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
