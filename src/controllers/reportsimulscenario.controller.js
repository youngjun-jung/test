const { executeQuery } = require('../config/queries');
const logger = require('../../logger'); 

  // 리포트 시나리오 조회
exports.getReportsimulscenario = async (req, res) => {
   const receivedData = req.query;

   const year = receivedData.year;
   
   const query = `
    SELECT YEAR, REGDATE, SCODE, TITLE, PLAN_CONDITION, DATETIME 
    FROM LIST_PLAN_SCENARIO_CODE
    WHERE YEAR = :year
        AND USE_YN = 'Y'
    ORDER BY IDX DESC`;

    const binds = {year: year};

    try {
      const data = await executeQuery(query, binds); // 데이터 조회
      res.json({ success: true, data }); // JSON 형식으로 응답
  
    } catch (err) {
      res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
    }
   
  };


