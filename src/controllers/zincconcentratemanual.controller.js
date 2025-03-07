const { executeQuery, executeQueryMany } = require('../config/queries');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getZincconcentratemanualchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;

  console.log("year: ", year);

  const query = `SELECT YEAR, GUBUN, MEASURE, XA, XB, XC
                  FROM PLAN_ZINC_CONCENTRATE_MANUAL
                  WHERE YEAR = :year
                  ORDER BY IDX`;                 

   const binds = {year: year};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
