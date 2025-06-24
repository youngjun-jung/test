const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/planplugmanual.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getPlanplugmanualchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;
  const procid = receivedData.procid;

  console.log("year: ", year);
  console.log("procid: ", procid);

  const query = `SELECT SCODE, VALUE
                FROM PLANNING_PLUG_MANUAL    
                WHERE YEAR = :year
                AND PROCID = 'jminzzang'
                AND USE_YN = 'Y'
                ORDER BY IDX`;                 

 const binds = {year: year};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};

exports.patchPlanplugmanualchk = async (req, res) => { 
  try {
    // 요청 본문에서 JSON 데이터 추출
    const receivedData = req.body;

    const year = receivedData.year;
    const zinc_in = receivedData.zinc_in;
    const zinc_lo = receivedData.zinc_lo;
    const zinc_out = receivedData.zinc_out;
    const zinc_out_in = receivedData.zinc_out_in;
    const s_in = receivedData.s_in;
    const s_dong = receivedData.s_dong;
    const s_on = receivedData.s_on;
    const procid = receivedData.procid;

    logger.info(`req year : ${year}`);
    logger.info(`req zinc_in : ${zinc_in}`);
    logger.info(`req zinc_lo : ${zinc_lo}`);
    logger.info(`req zinc_out : ${zinc_out}`);
    logger.info(`req zinc_out_in : ${zinc_out_in}`);
    logger.info(`req s_in : ${s_in}`);
    logger.info(`req s_dong : ${s_dong}`);
    logger.info(`req s_on : ${s_on}`);
    logger.info(`req procid : ${procid}`);

    // 저장 프로시저 호출
    const data = await executeProcedure.callPlanplugmanualproc(year, zinc_in, zinc_lo, zinc_out, zinc_out_in, s_in, s_dong, s_on, 'jminzzang');

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