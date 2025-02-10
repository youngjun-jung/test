const { executeQuery } = require('../config/queries');
const logger = require('../../logger'); 

  // 환율 관련 비즈니스 로직
exports.postExchangechk = async (req, res) => {
  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.body;

  logger.info(JSON.stringify(receivedData, null, 2));

  const query = 'INSERT INTO EXCHANGE_DAY(checkdate, timestamp, source) VALUES ?';
  const binds = data.map(item => [item.checkdate, item.timestamp, item.source]); // 데이터 배열 생성

    try {
      const data = await executeQuery(query, binds); // 데이터 조회
      res.json({ success: true, data }); // JSON 형식으로 응답

    } catch (err) {
      res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
    }
 };
