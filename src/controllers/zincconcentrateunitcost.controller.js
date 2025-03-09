const { executeQuery, executeQueryMany } = require('../config/queries');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getZincconcentrateunitcostchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;

  console.log("year: ", year);

  const query = `SELECT YEAR, MONTH_01, MONTH_02, MONTH_03, MONTH_04, MONTH_05, MONTH_06
                , MONTH_07, MONTH_08, MONTH_09, MONTH_10, MONTH_11, MONTH_12
                , COST_01, COST_02, COST_03, COST_04, COST_05, COST_06
                , COST_07, COST_08, COST_09, COST_10, COST_11, COST_12
                FROM PLAN_ZINC_CONCENTRATE_UNIT_COST A
                WHERE YEAR = :year`;                 

   const binds = {year: year};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
