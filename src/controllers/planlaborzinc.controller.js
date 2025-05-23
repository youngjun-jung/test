const { executeQuery, executeQueryMany } = require('../config/queries');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getPlanlaborzincchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;
  const procid = receivedData.procid;

  console.log("year: ", year);
  console.log("procid: ", procid);

  const query = `SELECT A.YEAR, A.SCODE, A.USE_YN, ROUND(SUM(NVL(MG_VALUE, 0) + NVL(IM_VALUE, 0)), 0) MG_VALUE, ROUND(SUM(PD_VALUE), 0) PD_VALUE
                  FROM PLAN_LABOR_ZINC_CODE A, PLAN_LABOR_ZINC_DTL B
                  WHERE A.YEAR = B.YEAR(+)
                  AND A.SCODE = B.MCODE(+)
                  AND A.YEAR = :year
                  AND B.PROCID(+) = :procid
                  AND (A.SCODE = 'PLZC001' 
                      OR SUBSTR(A.SCODE, 1, 5) = (SELECT CASE WHEN A_CNT > 0 AND B_CNT = 0 AND C_CNT = 0 THEN 'PLZCA'
                                                              WHEN A_CNT > 0 AND B_CNT > 0 AND C_CNT = 0 THEN 'PLZCB'
                                                              WHEN A_CNT > 0 AND B_CNT > 0 AND C_CNT > 0 THEN 'PLZCC'
                                                              ELSE 'PLZC0' END 
                                                  FROM (
                                                      SELECT SUM(DECODE(IDX, '0', 1, 0)) A_CNT
                                                      , SUM(DECODE(IDX, '1', 1, 0)) B_CNT
                                                      , SUM(DECODE(IDX, '2', 1, 0)) C_CNT
                                                      from PLAN_ELEC_RECTIFIER_DTL
                                                      WHERE YEAR = :year
                                                      AND GUBUN = '0'
                                                      AND PROCID = :procid
                                                      AND XSUM > 0
                                                      )
                                                  ))
                  GROUP BY A.YEAR, A.SCODE, A.USE_YN
                  ORDER BY A.SCODE`;                 

 const binds = {year: year, procid: procid};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
