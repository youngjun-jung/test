const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/planmonthlyinventorymanual.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getPlanmonthlyinventorymanualchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;
  const procid = receivedData.procid;

  console.log("year: ", year);
  console.log("procid: ", procid);

  query = `SELECT YEAR, SCODE, VALUE
            FROM PLANNING_MONTHLY_INVENTORY_MANUAL A
            WHERE YEAR = :year
            UNION ALL
            SELECT YEAR, 'PIVL0011' SCODE, CNT
            FROM PLAN_INVEN_VALUATION_LOSS A
            WHERE YEAR = :year
            AND PROCID = :procid
            AND SCODE = 'PIVL001'
            AND MONTH = '00'
            UNION ALL
            SELECT YEAR, 'PIVL0012' SCODE, AMT
            FROM PLAN_INVEN_VALUATION_LOSS A
            WHERE YEAR = :year
            AND PROCID = :procid
            AND SCODE = 'PIVL001'
            AND MONTH = '00'
            ORDER BY SCODE`; 

  binds = {year: year, procid: procid};                       
  
  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};

// 비즈니스 로직
exports.patchPlanmonthlyinventorymanualchk = async (req, res) => { 
  try {
    // 요청 본문에서 JSON 데이터 추출
    const receivedData = req.body;

    const year = receivedData.year;
    const zinc_cnt = receivedData.zinc_cnt;
    const zinc_dan = receivedData.zinc_dan;
    const s_cnt = receivedData.s_cnt;
    const s_dan = receivedData.s_dan;
    const sd_cnt = receivedData.sd_cnt;
    const sd_dan = receivedData.sd_dan;
    const jun_cnt = receivedData.jun_cnt;
    const jun_dan = receivedData.jun_dan;
    const ag_cnt = receivedData.ag_cnt;
    const ag_dan = receivedData.ag_dan;
    const au_cnt = receivedData.au_cnt;
    const au_dan = receivedData.au_dan;
    const sl_cnt = receivedData.sl_cnt;
    const sl_dan = receivedData.sl_dan;
    const cu_cnt = receivedData.cu_cnt;
    const cu_dan = receivedData.cu_dan;
    const self_cnt = receivedData.self_cnt;
    const self_dan = receivedData.self_dan;
    const ca_cnt = receivedData.ca_cnt;
    const ca_dan = receivedData.ca_dan;
    const jung_cnt = receivedData.jung_cnt;
    const jung_dan = receivedData.jung_dan;
    const procid = receivedData.procid;

    logger.info(`req year : ${year}`);
    logger.info(`req zinc_cnt : ${zinc_cnt}`);
    logger.info(`req zinc_dan : ${zinc_dan}`);
    logger.info(`req s_cnt : ${s_cnt}`);
    logger.info(`req s_dan : ${s_dan}`);
    logger.info(`req sd_cnt : ${sd_cnt}`);
    logger.info(`req sd_dan : ${sd_dan}`);
    logger.info(`req jun_cnt : ${jun_cnt}`);
    logger.info(`req jun_dan : ${jun_dan}`);
    logger.info(`req ag_cnt : ${ag_cnt}`);
    logger.info(`req ag_dan : ${ag_dan}`);
    logger.info(`req au_cnt : ${au_cnt}`);
    logger.info(`req au_dan : ${au_dan}`);
    logger.info(`req sl_cnt : ${sl_cnt}`);
    logger.info(`req sl_dan : ${sl_dan}`);
    logger.info(`req cu_cnt : ${cu_cnt}`);
    logger.info(`req cu_dan : ${cu_dan}`);
    logger.info(`req self_cnt : ${self_cnt}`);
    logger.info(`req self_dan : ${self_dan}`);
    logger.info(`req ca_cnt : ${ca_cnt}`);
    logger.info(`req ca_dan : ${ca_dan}`);
    logger.info(`req jung_cnt : ${jung_cnt}`);
    logger.info(`req jung_dan : ${jung_dan}`);
    logger.info(`req procid : ${procid}`);

    // 저장 프로시저 호출
    const data = await executeProcedure.callPlanmonthlyinventorymanualproc(year, zinc_cnt, zinc_dan, s_cnt, s_dan, sd_cnt, sd_dan, jun_cnt, jun_dan, ag_cnt, ag_dan, au_cnt, au_dan, sl_cnt, sl_dan, cu_cnt, cu_dan, self_cnt, self_dan, ca_cnt, ca_dan, jung_cnt, jung_dan, procid);

    logger.info(`req data : ${JSON.stringify(data, null, 2)}`);

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
