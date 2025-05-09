const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/refindicator.procedure');
const logger = require('../../logger'); 

exports.patchRefindicatorprocchk = async (req, res) => { 
  try {
    // 요청 본문에서 JSON 데이터 추출
    const receivedData = req.body;

    //logger.info(JSON.stringify(receivedData, null, 2));

    const year = receivedData.year;
    const scode = receivedData.scode;
    const annual = receivedData.annual;
    const month_01 = receivedData.month_01;
    const month_02 = receivedData.month_02;
    const month_03 = receivedData.month_03;
    const month_04 = receivedData.month_04;
    const month_05 = receivedData.month_05;
    const month_06 = receivedData.month_06;
    const month_07 = receivedData.month_07;
    const month_08 = receivedData.month_08;
    const month_09 = receivedData.month_09;
    const month_10 = receivedData.month_10;
    const month_11 = receivedData.month_11;
    const month_12 = receivedData.month_12;
    const save = receivedData.save;

    logger.info(`req year : ${year}`);
    logger.info(`req scode : ${scode}`);
    logger.info(`req annual : ${annual}`);
    logger.info(`req save : ${save}`);

    // 저장 프로시저 호출
    const data = await executeProcedure.callRefindicatorproc(year, scode, annual, month_01, month_02, month_03, month_04, month_05, month_06, month_07, month_08, month_09, month_10, month_11, month_12, save);

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