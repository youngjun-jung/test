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
  const gubun = receivedData.gubun;
  const chk_1 = receivedData.chk_1;
  const chk_2 = receivedData.chk_2;
  const chk_3 = receivedData.chk_3;
  const chk_4 = receivedData.chk_4;
  const chk_5 = receivedData.chk_5;
  const chk_6 = receivedData.chk_6;
  const chk_7 = receivedData.chk_7;
  const chk_8 = receivedData.chk_8;
  const chk_9 = receivedData.chk_9;
  const chk_10 = receivedData.chk_10;
  const chk_11 = receivedData.chk_11;
  const chk_12 = receivedData.chk_12;
  const chk = receivedData.chk;
  const plugid = receivedData.plugid;
  const procid = receivedData.procid;

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
  console.log("gubun: ", gubun);
  console.log("chk_1: ", chk_1);
  console.log("chk_2: ", chk_2);
  console.log("chk_3: ", chk_3);
  console.log("chk_4: ", chk_4);
  console.log("chk_5: ", chk_5);
  console.log("chk_6: ", chk_6);
  console.log("chk_7: ", chk_7);
  console.log("chk_8: ", chk_8);
  console.log("chk_9: ", chk_9);
  console.log("chk_10: ", chk_10);
  console.log("chk_11: ", chk_11);
  console.log("chk_12: ", chk_12);
  console.log("chk: ", chk);
  console.log("plugid: ", plugid);
  console.log("procid: ", procid);

  // 프로시저 호출
  const data1 = await executeProcedure.callPlannewtotalfinalproc(year, zinc_cnt, pd_1, pd_2, pd_3, pd_4, pd_5, pd_6, pd_7, pd_8, pd_9, pd_10, pd_11, pd_12, type_gubun, gubun, chk_1, chk_2, chk_3, chk_4, chk_5, chk_6, chk_7, chk_8, chk_9, chk_10, chk_11, chk_12, chk, plugid, procid);

  logger.info(`req data : ${JSON.stringify(data1, null, 2)}`);

  if (!data1 || Object.keys(data1).length === 0 || data1.returncode != '0000') {
    res.status(404).json({ success: false, message: '[오류]처리 실패', error: 'Procedure proc error' });
    return;
  }

  query = `SELECT YEAR, SCODE, XA, XB, XC
          , (SELECT XD + XE + XF + XH + XI + XJ + XL + XM + XN +XP + XQ + XR FROM PLUG WHERE YEAR = A.YEAR AND XB LIKE '황산생산' AND PROCID = :procid) S_CNT
          , (SELECT XD + XE + XF + XH + XI + XJ + XL + XM + XN +XP + XQ + XR FROM PLUG WHERE YEAR = A.YEAR AND XB LIKE '아연괴생산' AND PROCID = :procid) ZINC_CNT
          , (SELECT VALUE FROM PLAN_TRANSFER_ZINC WHERE YEAR = A.YEAR AND SCODE = 'PTZ001' AND PROCID = :procid) ZINC_TRANS
          , (SELECT XD + XE + XF + XH + XI + XJ + XL + XM + XN + XP + XQ + XR FROM PLUG WHERE XB = '정광' AND YEAR = A.YEAR AND PROCID = :procid) ZINC_CNT2
          , (SELECT SUM(XD + XE + XF + XH + XI + XJ + XL + XM + XN + XP + XQ + XR) FROM PLUG WHERE SCODE IN ('PPP0306', 'PPP0307', 'PPP0308') AND YEAR = A.YEAR AND PROCID = :procid) ZINC_CNT3
          , CASE WHEN FN_REF_VALUE('아연괴생산', A.YEAR, '00', :procid) + (SELECT VALUE FROM PLAN_TRANSFER_ZINC WHERE YEAR = A.YEAR AND SCODE = 'PTZ001' AND PROCID = :procid) > 220000 THEN ((FN_REF_VALUE('아연괴생산', A.YEAR, '00', :procid)  + (SELECT VALUE FROM PLAN_TRANSFER_ZINC WHERE YEAR = A.YEAR AND SCODE = 'PTZ001' AND PROCID = :procid) - 220000) / 220000) * FN_REF_VALUE('캐소드생산', A.YEAR, '00', :procid)
            ELSE 0 END AS CA_CNT
          FROM PLAN_ELEC_RECTIFIER_DTL A
          WHERE YEAR = :year
          AND GUBUN = '0'
          AND PROCID = :procid
          ORDER BY IDX `; 

  binds = {year: year, procid: procid};                       
  
  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
