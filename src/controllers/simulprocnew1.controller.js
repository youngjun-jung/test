const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/simulprocnew1.procedure');
const logger = require('../../logger'); 

// 비즈니스 로직
exports.postSimulprocnew1chk = async (req, res) => { 
  try {
    // 요청 본문에서 JSON 데이터 추출
    const receivedData = req.body;

    const year = receivedData.year;
    const procid = receivedData.procid;
    const zin_in = receivedData.zin_in;
    const zin_lo = receivedData.zin_lo;
    const zin_out = receivedData.zin_out;
    const s_in = receivedData.s_in;
    const s_dong = receivedData.s_dong;
    const s_on = receivedData.s_on;
    const scode = receivedData.scode;
    const zinc_trans = receivedData.zinc_trans;
    const ca_trans = receivedData.ca_trans;
    const comments = receivedData.comments;
    const zin_out_in = receivedData.zin_out_in;

    logger.info(`req year : ${year}`);
    logger.info(`req procid : ${procid}`);
    logger.info(`req zin_in : ${zin_in}`);
    logger.info(`req zin_lo : ${zin_lo}`);
    logger.info(`req zin_out : ${zin_out}`);
    logger.info(`req zin_out_in : ${zin_out_in}`);
    logger.info(`req s_in : ${s_in}`);
    logger.info(`req s_dong : ${s_dong}`);
    logger.info(`req s_on : ${s_on}`);
    logger.info(`req scode : ${scode}`);
    logger.info(`req zinc_trans : ${zinc_trans}`);
    logger.info(`req ca_trans : ${ca_trans}`);
    logger.info(`req comments : ${comments}`);

    // 저장 프로시저 호출
    const data = await executeProcedure.callSimulprocnewproc(year, procid, zin_in, zin_lo, zin_out, zin_out_in, s_in, s_dong, s_on, scode, zinc_trans, ca_trans, comments);

    //logger.info(`req data : ${JSON.stringify(data, null, 2)}`);

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
