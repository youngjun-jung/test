const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/plansellingexpensescnt.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getPlansellingexpensescntchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;
  const procid = receivedData.procid;

  console.log("year: ", year);
  console.log("procid: ", procid);

  const query = `SELECT YEAR, SNAME, SCODE, VALUE
                  FROM PLANNING_SELLING_EXPENSES_DTL_MANUAL A
                  WHERE A.YEAR = '2025'
                  ORDER BY SCODE`;                 

  const binds = {year: year, procid: procid};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
