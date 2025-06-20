const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/refindicator.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getPlanrefindicatorchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;
  const procid = receivedData.procid;

  console.log("year: ", year);
  console.log("procid: ", procid);

  const query = `SELECT YEAR, GUBUN1, GUBUN2, MEASURE, NVL(ANNUAL, 0) ANNUAL, NVL(MONTH_01, 0) MONTH_01, NVL(MONTH_02, 0) MONTH_02, NVL(MONTH_03, 0) MONTH_03, NVL(MONTH_04, 0) MONTH_04, NVL(MONTH_05, 0) MONTH_05
                , NVL(MONTH_06, 0) MONTH_06, NVL(MONTH_07, 0) MONTH_07, NVL(MONTH_08, 0) MONTH_08, NVL(MONTH_09, 0) MONTH_09, NVL(MONTH_10, 0) MONTH_10
                , NVL(MONTH_11, 0) MONTH_11, NVL(MONTH_12, 0) MONTH_12, BIGO, USE_YN, SCODE
                , (SELECT ROUND(SUM(MONTH_01 + MONTH_02 + MONTH_03 + MONTH_04 + MONTH_05 + MONTH_06 + MONTH_07 + MONTH_08 + MONTH_09 + MONTH_10+ MONTH_11 + MONTH_12), 0) FROM PLANNING_PLUG WHERE YEAR = :year AND SCODE IN ('PNNP001', 'PNNP004', 'PNNP007') AND PROCID = :procid) ZINCCNT
                , (SELECT VALUE FROM PLAN_SELLING_PRICE_MANUAL WHERE YEAR = A.YEAR AND SCODE = 'PLEM001') ZINCIN
                , (SELECT VALUE FROM PLAN_SELLING_PRICE_MANUAL WHERE YEAR = A.YEAR AND SCODE = 'PLEM002') ZINCOUT
                , FN_REF_VALUE('아연괴생산', A.YEAR, '01', :procid) ZINCCNT_01
                , FN_REF_VALUE('아연괴생산', A.YEAR, '02', :procid) ZINCCNT_02
                , FN_REF_VALUE('아연괴생산', A.YEAR, '03', :procid) ZINCCNT_03
                , FN_REF_VALUE('아연괴생산', A.YEAR, '04', :procid) ZINCCNT_04
                , FN_REF_VALUE('아연괴생산', A.YEAR, '05', :procid) ZINCCNT_05
                , FN_REF_VALUE('아연괴생산', A.YEAR, '06', :procid) ZINCCNT_06
                , FN_REF_VALUE('아연괴생산', A.YEAR, '07', :procid) ZINCCNT_07
                , FN_REF_VALUE('아연괴생산', A.YEAR, '08', :procid) ZINCCNT_08
                , FN_REF_VALUE('아연괴생산', A.YEAR, '09', :procid) ZINCCNT_09
                , FN_REF_VALUE('아연괴생산', A.YEAR, '10', :procid) ZINCCNT_10
                , FN_REF_VALUE('아연괴생산', A.YEAR, '11', :procid) ZINCCNT_11
                , FN_REF_VALUE('아연괴생산', A.YEAR, '12', :procid) ZINCCNT_12
                , (SELECT SUM(DECODE(MONTH, 1, OPERATION_DAYS_6, 0)) FROM PLAN_CALENDAR WHERE YEAR = A.YEAR AND PROCID = :procid) DAY_01
                , (SELECT SUM(DECODE(MONTH, 2, OPERATION_DAYS_6, 0)) FROM PLAN_CALENDAR WHERE YEAR = A.YEAR AND PROCID = :procid) DAY_02
                , (SELECT SUM(DECODE(MONTH, 3, OPERATION_DAYS_6, 0)) FROM PLAN_CALENDAR WHERE YEAR = A.YEAR AND PROCID = :procid) DAY_03
                , (SELECT SUM(DECODE(MONTH, 4, OPERATION_DAYS_6, 0)) FROM PLAN_CALENDAR WHERE YEAR = A.YEAR AND PROCID = :procid) DAY_04
                , (SELECT SUM(DECODE(MONTH, 5, OPERATION_DAYS_6, 0)) FROM PLAN_CALENDAR WHERE YEAR = A.YEAR AND PROCID = :procid) DAY_05
                , (SELECT SUM(DECODE(MONTH, 6, OPERATION_DAYS_6, 0)) FROM PLAN_CALENDAR WHERE YEAR = A.YEAR AND PROCID = :procid) DAY_06
                , (SELECT SUM(DECODE(MONTH, 7, OPERATION_DAYS_6, 0)) FROM PLAN_CALENDAR WHERE YEAR = A.YEAR AND PROCID = :procid) DAY_07
                , (SELECT SUM(DECODE(MONTH, 8, OPERATION_DAYS_6, 0)) FROM PLAN_CALENDAR WHERE YEAR = A.YEAR AND PROCID = :procid) DAY_08
                , (SELECT SUM(DECODE(MONTH, 9, OPERATION_DAYS_6, 0)) FROM PLAN_CALENDAR WHERE YEAR = A.YEAR AND PROCID = :procid) DAY_09
                , (SELECT SUM(DECODE(MONTH, 10, OPERATION_DAYS_6, 0)) FROM PLAN_CALENDAR WHERE YEAR = A.YEAR AND PROCID = :procid) DAY_10
                , (SELECT SUM(DECODE(MONTH, 11, OPERATION_DAYS_6, 0)) FROM PLAN_CALENDAR WHERE YEAR = A.YEAR AND PROCID = :procid) DAY_11
                , (SELECT SUM(DECODE(MONTH, 12, OPERATION_DAYS_6, 0)) FROM PLAN_CALENDAR WHERE YEAR = A.YEAR AND PROCID = :procid) DAY_12
                  FROM PLAN_REF_INDICATOR A
                  WHERE YEAR = :year
                  AND USE_YN = 'Y'
                  AND PROCID = :procid
                  ORDER BY IDX`;                 

 const binds = {year: year, procid: procid};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};

exports.patchPlanrefindicatorchk = async (req, res) => { 
  try {
    // 요청 본문에서 JSON 데이터 추출
    const receivedData = req.body;

    //logger.info(JSON.stringify(receivedData, null, 2));

    const year = receivedData.year;
    const scode = receivedData.scode;
    const annual = receivedData.annual;
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
    logger.info(`req procid : ${scode}`);
    logger.info(`req procid : ${annual}`);
    console.log("procid: ", procid);

    // 저장 프로시저 호출
    const data = await executeProcedure.callRefindicatorproc(year, scode, annual, month_01, month_02, month_03, month_04, month_05, month_06, month_07, month_08, month_09, month_10, month_11, month_12, procid);

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