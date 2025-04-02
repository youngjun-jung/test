const { executeQuery, executeQueryMany } = require('../config/queries');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getRefindicatorchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;

  console.log("year: ", year);

  const query = `SELECT YEAR, GUBUN1, GUBUN2, MEASURE, ANNUAL, MONTH_01, MONTH_02, MONTH_03, MONTH_04, MONTH_05 
                , MONTH_06, MONTH_07, MONTH_08, MONTH_09, MONTH_10, MONTH_11, MONTH_12, BIGO, USE_YN
                  FROM PLAN_REF_INDICATOR
                  WHERE YEAR = :year
                  AND USE_YN = 'Y'
                  ORDER BY IDX`;                 

 const binds = {year: year};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
