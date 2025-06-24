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
            , MONTH_01, MONTH_02, MONTH_03
            , MONTH_04, MONTH_05, MONTH_06
            , MONTH_07, MONTH_08, MONTH_09
            , MONTH_10, MONTH_11, MONTH_12
            FROM PLAN_SO_CODE A, PLAN_SO B
            WHERE A.YEAR = B.YEAR(+)
            AND A.SCODE = B.SCODE(+)
            AND A.YEAR = :year
            AND B.PROCID (+)= :procid
            AND A.SCODE NOT LIKE '%99'
            ORDER BY A.IDX`;

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
    const scode = receivedData.scode;
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
    const procid = receivedData.procid;

    logger.info(`req year : ${year}`);
    logger.info(`req scode : ${scode}`);
    logger.info(`req month_01 : ${month_01}`);
    logger.info(`req month_02 : ${month_02}`);
    logger.info(`req month_03 : ${month_03}`);
    logger.info(`req month_04 : ${month_04}`);
    logger.info(`req month_05 : ${month_05}`);
    logger.info(`req month_06 : ${month_06}`);
    logger.info(`req month_07 : ${month_07}`);
    logger.info(`req month_08 : ${month_08}`);
    logger.info(`req month_09 : ${month_09}`);
    logger.info(`req month_10 : ${month_10}`);
    logger.info(`req month_11 : ${month_11}`);
    logger.info(`req month_12 : ${month_12}`);
    logger.info(`req procid : ${procid}`);

    // 저장 프로시저 호출
    const data = await executeProcedure.callSoproc(year, scode, month_01, month_02, month_03, month_04, month_05, month_06, month_07, month_08, month_09, month_10, month_11, month_12, procid);

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