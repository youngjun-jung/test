const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/saveplug.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getSaveplugchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;
  const plugid = receivedData.plugid;
  const procid = receivedData.procid;
  const gubun = receivedData.gubun;
  const line = receivedData.line;
  const sale_yn = receivedData.sale_yn;

  console.log("year: ", year);
  console.log("plugid: ", plugid);
  console.log("procid: ", procid);
  console.log("gubun: ", gubun);
  console.log("line: ", line);
  console.log("sale_yn: ", sale_yn);

  const query = `SELECT PLUG_ID, COMMENTS, TIMEMARK, PROCID, USE_YN, DELETETIME, DELETEID, GUBUN
                , (SELECT TO_CHAR(ROUND(SUM(XD + XE + XF + XH + XI + XJ + XL + XM + XN + XP + XQ + XR), 2)) FROM PLAN_PLUG_DTL WHERE YEAR = :year AND PLUG_ID = A.PLUG_ID AND SCODE = 'PPP0211') CNT
                FROM PLAN_PLUG A
                WHERE PLUG_ID LIKE '%' || :plugid || '%'
                AND GUBUN = :gubun
                AND LINETYPE = :line
                AND PROCID LIKE '%' 
                AND SALE_YN = :sale_yn
                AND USE_YN = 'Y'
                ORDER BY IDX DESC`;                 

  const binds = {year: year, plugid: plugid, gubun: gubun, line: line, sale_yn: sale_yn};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};

 // 오류 정보 저장 로직
exports.postSaveplugchk = async (req, res) => {

  try {
    // 요청 본문에서 JSON 데이터 추출
    const receivedData = req.body;

    const plugid = receivedData.plugid;
    const lname = receivedData.lname;
    const mname = receivedData.mname;
    const measure = receivedData.measure;
    const month_01 = receivedData.month_01;
    const month_02 = receivedData.month_02;
    const month_03 = receivedData.month_03;
    const month_1 = receivedData.month_1;
    const month_04 = receivedData.month_04;
    const month_05 = receivedData.month_05;
    const month_06 = receivedData.month_06;
    const month_2 = receivedData.month_2;
    const month_07 = receivedData.month_07;
    const month_08 = receivedData.month_08;
    const month_09 = receivedData.month_09;
    const month_3 = receivedData.month_3;
    const month_10 = receivedData.month_10;
    const month_11 = receivedData.month_11;
    const month_12 = receivedData.month_12;
    const month_4 = receivedData.month_4;
    const month_0 = receivedData.month_0;
    const procid = receivedData.procid;
/*
    logger.info(`req plugid : ${plugid}`);
    logger.info(`req lname : ${lname}`);
*/
    logger.info(`req mname : ${mname}`);
/*  
    logger.info(`req measure : ${measure}`);
    logger.info(`req month_01 : ${month_01}`);
    logger.info(`req month_02 : ${month_02}`);
    logger.info(`req month_03 : ${month_03}`);
    logger.info(`req month_1 : ${month_1}`);
    logger.info(`req month_04 : ${month_04}`);
    logger.info(`req month_05 : ${month_05}`);
    logger.info(`req month_06 : ${month_06}`);
    logger.info(`req month_2 : ${month_2}`);
    logger.info(`req month_07 : ${month_07}`);
    logger.info(`req month_08 : ${month_08}`);
    logger.info(`req month_09 : ${month_09}`);
    logger.info(`req month_3 : ${month_3}`);
    logger.info(`req month_10 : ${month_10}`);
    logger.info(`req month_11 : ${month_11}`);
    logger.info(`req month_12 : ${month_12}`);
    logger.info(`req month_4 : ${month_4}`);
    logger.info(`req month_0 : ${month_0}`);
    logger.info(`req procid : ${procid}`);
*/
    // 저장 프로시저 호출
    const data = await executeProcedure.callSaveplugproc(plugid, lname, mname, measure, month_01, month_02, month_03, month_1, month_04, month_05, month_06, month_2, month_07, month_08, month_09, month_3, month_10, month_11, month_12, month_4, month_0, procid);

    logger.info(`req data : ${JSON.stringify(data, null, 2)}`);

    if (!data || Object.keys(data).length === 0) {
      res.status(404).json({ success: false, message: '오류 정보 저장 실패', error: 'User insert error' });
    }

    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '오류 정보 저장 실패', error: err.message });
  }
 };
