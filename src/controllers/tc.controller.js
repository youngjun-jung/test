const { executeQuery, executeQueryMany } = require('../config/queries');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getTcchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const query = `SELECT YEAR, BENCHMARK, SPOT, YP_TC
                  FROM TC_YEAR	
                  ORDER BY YEAR DESC`;                 

 const binds = {};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회

    //logger.info(`req data : ${JSON.stringify(data, null, 2)}`);

    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
