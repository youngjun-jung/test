const { executeQuery, executeQueryMany } = require('../config/queries');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getPlanlosschk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;
  const procid = receivedData.procid;

  console.log("year: ", year);
  console.log("procid: ", procid);

  const query = `SELECT SNAME, SCODE, CNT, AMT, YEAR||MONTH MONTH
                 FROM PLAN_INVEN_VALUATION_LOSS
                 WHERE YEAR = :year
                 AND PROCID = :procid
                 AND MONTH IN (SELECT MONTH FROM PLAN_SAIL_CONFIRM WHERE YEAR = :year AND PROCID = :procid)
                 ORDER BY IDX`;                 

  const binds = {year: year, procid: procid};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
