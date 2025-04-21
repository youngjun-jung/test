const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/planbackup.procedure');
const logger = require('../../logger'); 

// 비즈니스 로직
exports.postPlanbackupchk = async (req, res) => { 
  try {
    // 요청 본문에서 JSON 데이터 추출
    const receivedData = req.body;

    //logger.info(JSON.stringify(receivedData, null, 2));

    const year = receivedData.year;
    const comments = receivedData.comments;
    const procid = receivedData.procid;

    logger.info(`req year : ${year}`);
    logger.info(`req comments : ${comments}`);
    logger.info(`req procid : ${procid}`);

    // 저장 프로시저 호출
    const data = await executeProcedure.callPlanbackupproc(year, comments, procid);

    //logger.info(`req data : ${JSON.stringify(data, null, 2)}`);

    if (!data || Object.keys(data).length === 0) {
      logger.error('[404]Error calling stored procedure:', error);
      res.status(404).json({ success: false, message: '데이터 조회 실패', error: 'User not found' });
    }

    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    logger.error('[500]Error calling stored procedure:', err);
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
 };
