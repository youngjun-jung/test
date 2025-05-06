const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/plannewtotalfinal.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getPlannewtotalfinalchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;
  const zinc_cnt = receivedData.zinc_cnt;
  const pd_1 = receivedData.pd_1;
  const pd_2 = receivedData.pd_2;
  const pd_3 = receivedData.pd_3;
  const pd_4 = receivedData.pd_4;
  const pd_5 = receivedData.pd_5;
  const pd_6 = receivedData.pd_6;
  const pd_7 = receivedData.pd_7;
  const pd_8 = receivedData.pd_8;
  const pd_9 = receivedData.pd_9;
  const pd_10 = receivedData.pd_10;
  const pd_11 = receivedData.pd_11;
  const pd_12 = receivedData.pd_12;
  const type_gubun = '1';

  console.log("year: ", year);
  console.log("zinc_cnt: ", zinc_cnt);
  console.log("pd_1: ", pd_1);
  console.log("pd_2: ", pd_2);
  console.log("pd_3: ", pd_3);
  console.log("pd_4: ", pd_4);
  console.log("pd_5: ", pd_5);
  console.log("pd_6: ", pd_6);
  console.log("pd_7: ", pd_7);
  console.log("pd_8: ", pd_8);
  console.log("pd_9: ", pd_9);
  console.log("pd_10: ", pd_10);
  console.log("pd_11: ", pd_11);
  console.log("pd_12: ", pd_12);

  // 프로시저 호출
  const data1 = await executeProcedure.callPlannewtotalfinalproc(year, zinc_cnt, pd_1, pd_2, pd_3, pd_4, pd_5, pd_6, pd_7, pd_8, pd_9, pd_10, pd_11, pd_12, type_gubun);

  logger.info(`req data : ${JSON.stringify(data1, null, 2)}`);

  if (!data1 || Object.keys(data1).length === 0 || data1.returncode != '0000') {
    res.status(404).json({ success: false, message: '오류 정보 저장 실패', error: 'User insert error' });
    return;
  }

  query = `SELECT YEAR, SCODE, XA, XB, XC
          , (SELECT XD + XE + XF + XH + XI + XJ + XL + XM + XN +XP + XQ + XR FROM PLUG WHERE YEAR = A.YEAR AND XB LIKE '황산생산') S_CNT
          , (SELECT XD + XE + XF + XH + XI + XJ + XL + XM + XN +XP + XQ + XR FROM PLUG WHERE YEAR = A.YEAR AND XB LIKE '아연괴생산') ZINC_CNT
          , (SELECT VALUE FROM PLAN_TRANSFER_ZINC WHERE YEAR = A.YEAR AND SCODE = 'PTZ001') ZINC_TRANS
          , (SELECT XD + XE + XF + XH + XI + XJ + XL + XM + XN + XP + XQ + XR FROM PLUG WHERE XB = '정광' AND YEAR = A.YEAR) ZINC_CNT2
          , (SELECT SUM(XD + XE + XF + XH + XI + XJ + XL + XM + XN + XP + XQ + XR) FROM PLUG WHERE SCODE IN ('PPP0306', 'PPP0307', 'PPP0308') AND YEAR = A.YEAR) ZINC_CNT3
          FROM PLAN_ELEC_RECTIFIER_DTL A
          WHERE YEAR = :year
          AND GUBUN = '0'
          ORDER BY IDX `; 

  binds = {year: year};                       
  
  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
