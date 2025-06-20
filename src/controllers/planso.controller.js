const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/planso.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getPlansochk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;
  const procid = receivedData.procid;

  console.log("year: ", year);
  console.log("procid: ", procid);
 
  query = `SELECT A.LNAME, A.MNAME, A.SNAME, A.SCODE
            , TO_CHAR(MONTH_01) MONTH_01, TO_CHAR(MONTH_01) MONTH_01, TO_CHAR(MONTH_01) MONTH_01
            , TO_CHAR(MONTH_01) MONTH_01, TO_CHAR(MONTH_01) MONTH_01, TO_CHAR(MONTH_01) MONTH_01
            , TO_CHAR(MONTH_01) MONTH_01, TO_CHAR(MONTH_01) MONTH_01, TO_CHAR(MONTH_01) MONTH_01
            , TO_CHAR(MONTH_01) MONTH_01, TO_CHAR(MONTH_01) MONTH_01, TO_CHAR(MONTH_01) MONTH_01
            FROM PLAN_SO_CODE A, PLAN_SO B
            WHERE A.YEAR = B.YEAR(+)
            AND A.SOCDE = B.SCODE(+)
            AND A.YEAR = :year
            AND A.PROCID = :procid
            ORDER BY IDX`;

  binds = {year: year,procid: procid};                       
  
  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};

exports.patchPlansochk = async (req, res) => { 
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
    const cost10 = receivedData.cost10;
    const cost11 = receivedData.cost11;
    const cost12 = receivedData.cost12;
    const cost13 = receivedData.cost13;

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
    logger.info(`req cost10 : ${cost10}`);
    logger.info(`req cost11 : ${cost11}`);
    logger.info(`req cost12 : ${cost12}`);
    logger.info(`req cost13 : ${cost13}`);

    // 저장 프로시저 호출
    const data = await executeProcedure.callElecrectifiercostproc(year, cost1, cost2, cost3, cost4, cost5, cost6, cost7, cost8, cost9, cost10, cost11, cost12, cost13);

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