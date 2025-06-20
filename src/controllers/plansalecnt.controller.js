const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/plansalecnt.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getPlansalecntchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;
  const procid = receivedData.procid;

  console.log("year: ", year);
  console.log("procid: ", procid);

  const query = `SELECT A.YEAR, A.NAME, A.LNAME, A.MNAME, A.SNAME, A.SCODE
                , DECODE((SELECT CHK FROM PLAN_CALENDAR WHERE YEAR = A.YEAR AND PROCID = B.PROCID AND MONTH = 1), '1', ROUND(MONTH_01, 2), 0) MONTH_01
                , DECODE((SELECT CHK FROM PLAN_CALENDAR WHERE YEAR = A.YEAR AND PROCID = B.PROCID AND MONTH = 2), '1', ROUND(MONTH_02, 2), 0) MONTH_02
                , DECODE((SELECT CHK FROM PLAN_CALENDAR WHERE YEAR = A.YEAR AND PROCID = B.PROCID AND MONTH = 3), '1', ROUND(MONTH_03, 2), 0) MONTH_03
                , DECODE((SELECT CHK FROM PLAN_CALENDAR WHERE YEAR = A.YEAR AND PROCID = B.PROCID AND MONTH = 4), '1', ROUND(MONTH_04, 2), 0) MONTH_04
                , DECODE((SELECT CHK FROM PLAN_CALENDAR WHERE YEAR = A.YEAR AND PROCID = B.PROCID AND MONTH = 5), '1', ROUND(MONTH_05, 2), 0) MONTH_05
                , DECODE((SELECT CHK FROM PLAN_CALENDAR WHERE YEAR = A.YEAR AND PROCID = B.PROCID AND MONTH = 6), '1', ROUND(MONTH_06, 2), 0) MONTH_06
                , DECODE((SELECT CHK FROM PLAN_CALENDAR WHERE YEAR = A.YEAR AND PROCID = B.PROCID AND MONTH = 7), '1', ROUND(MONTH_07, 2), 0) MONTH_07
                , DECODE((SELECT CHK FROM PLAN_CALENDAR WHERE YEAR = A.YEAR AND PROCID = B.PROCID AND MONTH = 8), '1', ROUND(MONTH_08, 2), 0) MONTH_08
                , DECODE((SELECT CHK FROM PLAN_CALENDAR WHERE YEAR = A.YEAR AND PROCID = B.PROCID AND MONTH = 9), '1', ROUND(MONTH_09, 2), 0) MONTH_09
                , DECODE((SELECT CHK FROM PLAN_CALENDAR WHERE YEAR = A.YEAR AND PROCID = B.PROCID AND MONTH = 10), '1', ROUND(MONTH_10, 2), 0) MONTH_10
                , DECODE((SELECT CHK FROM PLAN_CALENDAR WHERE YEAR = A.YEAR AND PROCID = B.PROCID AND MONTH = 11), '1', ROUND(MONTH_11, 2), 0) MONTH_11
                , DECODE((SELECT CHK FROM PLAN_CALENDAR WHERE YEAR = A.YEAR AND PROCID = B.PROCID AND MONTH = 12), '1', ROUND(MONTH_12, 2), 0) MONTH_12
                FROM PLANNING_PLUG_CODE A, PLANNING_PLUG B
                WHERE A.YEAR = B.YEAR
                AND A.YEAR = :year
                AND B.PROCID = :procid
                AND A.SCODE = B.SCODE
                ORDER BY A.IDX`;                 

  const binds = {year: year, procid: procid};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};

exports.patchPlansalecntchk = async (req, res) => { 
  try {
    // 요청 본문에서 JSON 데이터 추출
    const receivedData = req.body;

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
    const data = await executeProcedure.callPlansalecntproc(year, scode, month_01, month_02, month_03, month_04, month_05, month_06, month_07, month_08, month_09, month_10, month_11, month_12, procid);

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