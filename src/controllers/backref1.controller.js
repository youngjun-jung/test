const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/refmanual.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getRef1chk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const backupid = receivedData.backupid;

  console.log("backupid: ", backupid);
/*
   // 프로시저 호출
   const data1 = await executeProcedure.callRefmanualproc(year);

   logger.info(`req data : ${JSON.stringify(data1, null, 2)}`);
 
   if (!data1 || Object.keys(data1).length === 0) {
     res.status(404).json({ success: false, message: '오류 정보 저장 실패', error: 'User insert error' });
   }
*/
  const query = `SELECT NUM, XA, XB, XC, GUBUN1, XD, XE, XF
              , CASE WHEN GUBUN1 = '0' THEN ROUND((XD + XE + XF)/3, 2)
                      WHEN GUBUN1 = '1' THEN ROUND(XD + XE + XF, 2)
                      ELSE 0
                      END AS XG 
              , XH, XI, XJ        
              , CASE WHEN GUBUN1 = '0' THEN ROUND((XH + XI + XJ)/3, 2)
                      WHEN GUBUN1 = '1' THEN ROUND(XH + XI + XJ, 2)
                      ELSE 0
                      END AS XK  
              , XL, XM, XN        
              , CASE WHEN GUBUN1 = '0' THEN ROUND((XL + XM + XN)/3, 2)
                      WHEN GUBUN1 = '1' THEN ROUND(XL + XM + XN, 2)
                      ELSE 0
                      END AS XO 
              , XP, XQ, XR        
              , CASE WHEN GUBUN1 = '0' THEN ROUND((XP + XQ + XR)/3, 2)
                      WHEN GUBUN1 = '1' THEN ROUND(XP + XQ + XR, 2)
                      ELSE 0
                      END AS XS     
              , CASE WHEN GUBUN1 = '0' THEN ROUND((XD + XE + XF + XH + XI + XL + XM + XN + XJ + XP + XQ + XR)/12, 2)
                      WHEN GUBUN1 = '1' THEN ROUND(XD + XE + XF + XH + XI + XL + XM + XN + XJ + XP + XQ + XR, 2)
                      ELSE 0
                      END AS XT                              
              FROM (        
                  SELECT A.NUM, A.XA, A.XB, A.XC, GUBUN1
                  , FN_REF_CAL_BACK(A.XB, A.BACKUP_ID, '01', A.AUTO_YN, ROUND(XD, 2)) XD
                  , FN_REF_CAL_BACK(A.XB, A.BACKUP_ID, '02', A.AUTO_YN, ROUND(XE, 2)) XE
                  , FN_REF_CAL_BACK(A.XB, A.BACKUP_ID, '03', A.AUTO_YN, ROUND(XF, 2)) XF                     
                  , FN_REF_CAL_BACK(A.XB, A.BACKUP_ID, '04', A.AUTO_YN, ROUND(XH, 2)) XH
                  , FN_REF_CAL_BACK(A.XB, A.BACKUP_ID, '05', A.AUTO_YN, ROUND(XI, 2)) XI
                  , FN_REF_CAL_BACK(A.XB, A.BACKUP_ID, '06', A.AUTO_YN, ROUND(XJ, 2)) XJ                  
                  , FN_REF_CAL_BACK(A.XB, A.BACKUP_ID, '07', A.AUTO_YN, ROUND(XL, 2)) XL
                  , FN_REF_CAL_BACK(A.XB, A.BACKUP_ID, '08', A.AUTO_YN, ROUND(XM, 2)) XM
                  , FN_REF_CAL_BACK(A.XB, A.BACKUP_ID, '09', A.AUTO_YN, ROUND(XN, 2)) XN                   
                  , FN_REF_CAL_BACK(A.XB, A.BACKUP_ID, '10', A.AUTO_YN, ROUND(XP, 2)) XP
                  , FN_REF_CAL_BACK(A.XB, A.BACKUP_ID, '11', A.AUTO_YN, ROUND(XQ, 2)) XQ
                  , FN_REF_CAL_BACK(A.XB, A.BACKUP_ID, '12', A.AUTO_YN, ROUND(XR, 2)) XR                             
                  FROM BACKUP_PLAN_REF_AUTO_CODE A, BACKUP_PLUG B
                  WHERE A.XB = B.XB(+)
                  AND A.BACKUP_ID = B.BACKUP_ID(+)
                  AND A.BACKUP_ID = :backupid
                  AND A.USE_YN = 'Y'
              )    
              ORDER BY NUM`;                 

 const binds = {backupid: backupid};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
