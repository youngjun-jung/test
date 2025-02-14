const { executeQuery, executeQueryMany } = require('../config/queries');
const logger = require('../../logger'); 

  // 환율 관련 비즈니스 로직
exports.postExchangechk = async (req, res) => {
  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.body;

  //logger.info(JSON.stringify(receivedData, null, 2));

  const checkdate = receivedData.checkdate;
  const source = receivedData.source;
  const mainbody  = receivedData.data;

  logger.info(`checkdate : ${checkdate}`);
  logger.info(`source : ${source}`);

  const query_del = 'DELETE EXCHANGE_DAY WHERE CHECKDATE = :checkdate' 
  const binds_del = {checkdate: checkdate};

    try {
      const data = await executeQuery(query_del, binds_del); // 데이터 삭제
    } catch (err) {
      res.status(500).json({ success: false, message: '데이터 삭제 실패', error: err.message });
    }

  const query = `INSERT INTO EXCHANGE_DAY(checkdate, source, cur_unit, cur_nm, ttb, tts, deal_bas_r) 
                 VALUES (:checkdate, :source, :cur_unit, :cur_nm, TO_NUMBER(REPLACE(:ttb, ',', ''))
                 , TO_NUMBER(REPLACE(:tts, ',', '')), TO_NUMBER(REPLACE(:deal_bas_r, ',', '')))`;
  const binds = mainbody.map(item => [checkdate, source, item.cur_unit, item.cur_nm, item.ttb, item.tts, item.deal_bas_r]); // 데이터 배열 생성

    try {
      const data = await executeQueryMany(query, binds); // 데이터 조회
      res.json({ success: true, data }); // JSON 형식으로 응답

    } catch (err) {
      res.status(500).json({ success: false, message: '데이터 처리 실패', error: err.message });
    }
 };
