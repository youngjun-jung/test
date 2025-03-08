const { executeQuery, executeQueryMany } = require('../config/queries');
const logger = require('../../logger'); 

  // 환율 관련 비즈니스 로직
exports.getExchangechk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const frdate = receivedData.frdate;
  const todate = receivedData.todate;

  console.log("frdate: ", frdate);
  console.log("todate: ", todate);

  const query = `SELECT CHECKDATE, USD, JPY, CNY, EUR, GBP, AUD
                  FROM EXCHANGE_DAY
                  WHERE CHECKDATE BETWEEN :frdate AND :todate
                  ORDER BY CHECKDATE DESC`;                 

 const binds = {frdate: frdate, todate: todate};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
