const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/planloss.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getPlanlosschk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;
  const procid = receivedData.procid;

  console.log("year: ", year);
  console.log("procid: ", procid);

  const query = `SELECT SNAME, SCODE, CNT, AMT, YEAR||MONTH MONTH
                 FROM PLAN_INVEN_VALUATION_LOSS
                 WHERE YEAR = :year
                 AND PROCID = :procid
                 AND MONTH IN (SELECT MONTH_NEXT FROM PLAN_SAIL_CONFIRM WHERE YEAR = :year AND PROCID = :procid)
                 ORDER BY IDX`;                 

  const binds = {year: year, procid: procid};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};

 // 비즈니스 수정 로직
exports.patchPlanlosschk = async (req, res) => {
  try {
  // 요청 본문에서 JSON 데이터 추출
    const receivedData = req.body;

    //logger.info(JSON.stringify(receivedData, null, 2));

    const year = receivedData.year;
    const month = receivedData.month;
    const zinccnt = receivedData.zinccnt;
    const zincamt = receivedData.zincamt;
    const jungcnt = receivedData.jungcnt;
    const jungamt = receivedData.jungamt;
    const socnt = receivedData.socnt;
    const soamt = receivedData.soamt;
    const cathcnt = receivedData.cathcnt;
    const cathamt = receivedData.cathamt;
    const procid = receivedData.procid;

    logger.info(`req year : ${year}`);
    logger.info(`req month : ${month}`);
    logger.info(`req zinccnt : ${zinccnt}`);
    logger.info(`req zincamt : ${zincamt}`);
    logger.info(`req jungcnt : ${jungcnt}`);
    logger.info(`req jungamt : ${jungamt}`);
    logger.info(`req socnt : ${socnt}`);
    logger.info(`req soamt : ${soamt}`);
    logger.info(`req cathcnt : ${cathcnt}`);
    logger.info(`req cathamt : ${cathamt}`);
    logger.info(`req procid : ${procid}`);

    // 저장 프로시저 호출
    const data = await executeProcedure.callPlanlossproc(year, month, zinccnt, zincamt, jungcnt, jungamt, socnt, soamt, cathcnt, cathamt, procid);

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