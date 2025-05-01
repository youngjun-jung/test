const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/elecrectifierwoncost.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getElecrectifierwoncostchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;

  console.log("year: ", year);
 
  query = `SELECT SCODE, VALUE
            FROM PLAN_ELEC_RECTIFIER_MANUAL
            WHERE YEAR = :year
            AND SCODE IN ('PERM0523', 'PERM0522', 'PERM0521', 'PERM0513', 'PERM0512', 'PERM0511', 'PERM0503', 'PERM0502', 'PERM0501')
            ORDER BY IDX`;

  binds = {year: year};                       
  
  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};

exports.patchElecrectifierwoncostchk = async (req, res) => { 
  try {
    // 요청 본문에서 JSON 데이터 추출
    const receivedData = req.body;

    //logger.info(JSON.stringify(receivedData, null, 2));

    const year = receivedData.year;
    const cost1 = receivedData.cost1;
    const cost2 = receivedData.cost2;
    const cost3 = receivedData.cost3;
    const cost4 = receivedData.cost4;
    const cost5 = receivedData.cost5;
    const cost6 = receivedData.cost6;
    const cost7 = receivedData.cost7;
    const cost8 = receivedData.cost8;
    const cost9 = receivedData.cost9;

    logger.info(`req year : ${year}`);
    logger.info(`req cost1 : ${cost1}`);
    logger.info(`req cost2 : ${cost2}`);
    logger.info(`req cost3 : ${cost3}`);
    logger.info(`req cost4 : ${cost4}`);
    logger.info(`req cost5 : ${cost5}`);
    logger.info(`req cost6 : ${cost6}`);
    logger.info(`req cost7 : ${cost7}`);
    logger.info(`req cost8 : ${cost8}`);
    logger.info(`req cost9 : ${cost9}`);

    // 저장 프로시저 호출
    const data = await executeProcedure.callElecrectifierwoncostproc(year, cost1, cost2, cost3, cost4, cost5, cost6, cost7, cost8, cost9);
    //logger.info(`req data : ${JSON.stringify(data, null, 2)}`);

    if (!data || Object.keys(data).length === 0) {
      logger.error('[404]Error calling stored procedure:', error);
      res.status(404).json({ success: false, message: '데이터 조회 실패', error: 'data proc error' });
    }

    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    logger.error('[500]Error calling stored procedure:', err);
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
 };