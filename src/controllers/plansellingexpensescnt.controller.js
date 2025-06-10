const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/plansellingexpensescnt.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getPlansellingexpensescntchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;
  const procid = receivedData.procid;

  console.log("year: ", year);
  console.log("procid: ", procid);

  const query = `SELECT YEAR, SNAME, SCODE, ROUND(VALUE, 8) VALUE
                  FROM PLANNING_SELLING_EXPENSES_DTL_MANUAL A
                  WHERE A.YEAR = :year
                  AND SCODE IN ('PNSED0032', 'PNSED0033')
                  ORDER BY SCODE`;                 

  const binds = {year: year};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};

exports.patchPlansellingexpensescntchk = async (req, res) => { 
  try {
    // 요청 본문에서 JSON 데이터 추출
    const receivedData = req.body;

    const year = receivedData.year;
    const scode = receivedData.scode;
    const value = receivedData.value;
    const procid = receivedData.procid;

    logger.info(`req year : ${year}`);
    logger.info(`req scode : ${scode}`);
    logger.info(`req value : ${value}`);
    logger.info(`req procid : ${procid}`);

    // 저장 프로시저 호출
    const data = await executeProcedure.callPlansellingexpensescntproc(year, scode, value, procid);

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