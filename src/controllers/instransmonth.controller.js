const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/instransmonth.procedure');
const logger = require('../../logger'); 

// 비즈니스 로직
exports.postInstransmonthchk = async (req, res) => { 
  try {
    // 요청 본문에서 JSON 데이터 추출
    const receivedData = req.body;

    //logger.info(JSON.stringify(receivedData, null, 2));

    const month = receivedData.month;
    const procid = receivedData.procid;
    const transid = receivedData.transid;

    logger.info(`req month : ${month}`);
    logger.info(`req procid : ${procid}`);
    logger.info(`req transid : ${transid}`);

    // 저장 프로시저 호출
    const data = await executeProcedure.callInstransmonthproc(month, procid, transid);

    logger.info(`req data : ${JSON.stringify(data, null, 2)}`);

    if (!data || Object.keys(data).length === 0) {
      logger.error('[404]Error calling stored procedure:', error);
      res.status(404).json({ success: false, message: '[오류]처리 실패', error: 'Procedure proc error' });
    }

    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    logger.error('[500]Error calling stored procedure:', err);
    res.status(500).json({ success: false, message: '[오류]처리 실패', error: err.message });
  }
 };
