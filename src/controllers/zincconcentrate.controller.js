const { executeQuery, executeQueryMany } = require('../config/queries');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getZincconcentratechk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;

  console.log("year: ", year);

  const query = `SELECT DECODE(GUBUN, '1', '수입', '0', '국내', '기타') GUBUN, YEAR, SNAME, IDX
                , SUM(DECODE(MONTH, '01', CNT, 0)) CNT_01
                , SUM(DECODE(MONTH, '01', UNIT_COST, 0)) UNIT_COST_01
                , SUM(DECODE(MONTH, '01', AMT, 0)) AMT_01
                , SUM(DECODE(MONTH, '02', CNT, 0)) CNT_02
                , SUM(DECODE(MONTH, '02', UNIT_COST, 0)) UNIT_COST_02
                , SUM(DECODE(MONTH, '02', AMT, 0)) AMT_02
                , SUM(DECODE(MONTH, '03', CNT, 0)) CNT_03
                , SUM(DECODE(MONTH, '03', UNIT_COST, 0)) UNIT_COST_03
                , SUM(DECODE(MONTH, '03', AMT, 0)) AMT_03
                , SUM(DECODE(MONTH, '04', CNT, 0)) CNT_04
                , SUM(DECODE(MONTH, '04', UNIT_COST, 0)) UNIT_COST_04
                , SUM(DECODE(MONTH, '04', AMT, 0)) AMT_04
                , SUM(DECODE(MONTH, '05', CNT, 0)) CNT_05
                , SUM(DECODE(MONTH, '05', UNIT_COST, 0)) UNIT_COST_05
                , SUM(DECODE(MONTH, '05', AMT, 0)) AMT_05
                , SUM(DECODE(MONTH, '06', CNT, 0)) CNT_06
                , SUM(DECODE(MONTH, '06', UNIT_COST, 0)) UNIT_COST_06
                , SUM(DECODE(MONTH, '06', AMT, 0)) AMT_06
                , SUM(DECODE(MONTH, '07', CNT, 0)) CNT_07
                , SUM(DECODE(MONTH, '07', UNIT_COST, 0)) UNIT_COST_07
                , SUM(DECODE(MONTH, '07', AMT, 0)) AMT_07
                , SUM(DECODE(MONTH, '08', CNT, 0)) CNT_08
                , SUM(DECODE(MONTH, '08', UNIT_COST, 0)) UNIT_COST_08
                , SUM(DECODE(MONTH, '08', AMT, 0)) AMT_08
                , SUM(DECODE(MONTH, '09', CNT, 0)) CNT_09
                , SUM(DECODE(MONTH, '09', UNIT_COST, 0)) UNIT_COST_09
                , SUM(DECODE(MONTH, '09', AMT, 0)) AMT_09
                , SUM(DECODE(MONTH, '10', CNT, 0)) CNT_10
                , SUM(DECODE(MONTH, '10', UNIT_COST, 0)) UNIT_COST_10
                , SUM(DECODE(MONTH, '10', AMT, 0)) AMT_10
                , SUM(DECODE(MONTH, '11', CNT, 0)) CNT_11
                , SUM(DECODE(MONTH, '11', UNIT_COST, 0)) UNIT_COST_11
                , SUM(DECODE(MONTH, '11', AMT, 0)) AMT_11
                , SUM(DECODE(MONTH, '12', CNT, 0)) CNT_12
                , SUM(DECODE(MONTH, '12', UNIT_COST, 0)) UNIT_COST_12
                , SUM(DECODE(MONTH, '12', AMT, 0)) AMT_12
                FROM PLAN_ZINC_CONCENTRATE_CODE X
                , PLAN_ZINC_CONCENTRATE A
                WHERE X.SNAME = A.NAME(+)
                AND YEAR = :year
                GROUP BY GUBUN, YEAR, SNAME, IDX
                ORDER BY YEAR, IDX`;                 

   const binds = {year: year};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
