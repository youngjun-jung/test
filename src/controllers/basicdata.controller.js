const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/basicdata.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.patchBasicdatachk = async (req, res) => { 
  try {
    // 요청 본문에서 JSON 데이터 추출
    const receivedData = req.body;

    //logger.info(JSON.stringify(receivedData, null, 2));

    const year = receivedData.year;
    const zinccnt = receivedData.zinccnt;
    const zincin = receivedData.zincin;
    const zincout = receivedData.zincout;
    const zinctrans = receivedData.zinctrans;
    const type_gubun = receivedData.type_gubun;
     const procid = receivedData.procid;

    logger.info(`req year : ${year}`);
    logger.info(`req zinccnt : ${zinccnt}`);
    logger.info(`req zincin : ${zincin}`);
    logger.info(`req zincout : ${zincout}`);
    logger.info(`req zinctrans : ${zinctrans}`);
    logger.info(`req type_gubun : ${type_gubun}`);
    logger.info(`req procid : ${procid}`);

    logger.info(`START`);

    // 저장 프로시저 호출
    const data = await executeProcedure.callBasicdataproc(year, zinccnt, zincin, zincout, zinctrans, type_gubun, procid);

    logger.info(`END`);
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